const fs = require( 'fs' );
const path = require( 'path' );
const util = require( 'util' );

const copydir = util.promisify( require( 'copy-dir' ) );

const unified = require( 'unified' );
const markdown = require( 'remark-parse' );
const html = require( 'remark-html' );
const highlight = require( 'remark-highlight.js' );

const EnvUtils = require( '../utils/env-utils' );
const FsUtils = require( '../utils/fs' );
const TranslitUtils = require( '../utils/translit-rus-to-eng' );
const PathUtils = require( '../utils/path-utils' );
const compose = require( '../utils/compose' );


/* formatters */
const SplitIntoSectionFormatter = require( '../formatters/split-into-section-formatter' );
const AddCopySubchapterLinkToBufferButtonAfterH2Formatter = require( '../formatters/add-copy-subchapter-link-to-buffer-button-after-h2-formatter' );
const AddPathToLinkFormatter = require( '../formatters/add-path-to-link-formatter' );
const ImageLinkFormatter = require( '../formatters/image-link-formatter' );

/* ---------- */

function addClassToInlineCode () {
    return function ( node, file ) {
        const parse = node => {
            if ( node.children ) {
                node.children.forEach( parse );
            } else if ( node.type === 'inlineCode' ) {
                if ( !node.data ) {
                    node.data = {};
                }

                if ( !node.data.hProperties ) {
                    node.data.hProperties = {};
                }

                if ( !node.data.hProperties.className ) {
                    node.data.hProperties.className = [];
                }

                let className = node.data.hProperties.className;

                className.push( 'inline-code' );
            }
        };

        parse( node );

        return node;
    }
}

function addIdToH2 () {
    return function ( node, file ) {
        node.children.forEach( node => {
            if ( node.type === 'heading' ) {

                if ( !node.data ) {
                    node.data = {};
                }

                if ( !node.data.hProperties ) {
                    node.data.hProperties = {};
                }

                if ( !node.data.hChildren ) {
                    node.data.hChildren = [];
                }

                let properties = node.data.hProperties;
                let children = node.data.hChildren;
                let id = node.children[ 0 ].value;


                properties.id = id;

                children.push( { type: 'text', value: id } );
            }
        } );


        return node;
    }
}

function addClass () {
    const addClass = node => {
        if ( !node.data ) {
            node.data = {};
        }

        if ( !node.data.hProperties ) {
            node.data.hProperties = {};
        }

        if ( !node.data.hProperties.className ) {
            node.data.hProperties.className = [];
        }


        return node;
    };

    return function ( node, file ) {
        const parse = node => {
            if ( node.children ) {
                node.children.forEach( parse );
            }
            if ( node.type === 'list' ) {
                addClass( node ).data.hProperties.className.push( 'book__list' );
            }
            if ( node.type === 'listItem' ) {
                addClass( node ).data.hProperties.className.push( 'book__list__item' );
            }
            if ( node.type === 'image' ) {
                addClass( node ).data.hProperties.className.push( 'book__image' );
            }
        };

        parse( node );


        return node;
    }
}

const processor = unified()

    .use( markdown )
    .use( highlight )
    .use( addClassToInlineCode )
    .use( addClass )
    // .use( addIdToH2 )
    .use( html )


if( EnvUtils.getProp( 'path_to_book_dir' ) === undefined ){
    console.log( `> [meta PathToBookDir] Path to dir whats-is-new not must be undefined/` );
}


const PATH_TO_BOOK_DIR = PathUtils.toAbsolutePath( EnvUtils.getProp( 'path_to_book_dir' ) );
const PATH_TO_INPUT_DIR = EnvUtils.getProp( 'path_to_dir_with_md' );
const PATH_TO_OUTPUT_DIR = PathUtils.toAbsolutePath( EnvUtils.getProp( 'path_to_dir_with_temporary_html' ) );


const readFile = filepath => fs.promises.readFile( filepath );


const createDirectoryIfItDoesNotExist = dirpath => fs.promises.mkdir( dirpath, { recursive: true } );
const readdir = async path =>  await fs.promises.readdir( PathUtils.toAbsolutePath( path ) );


const action = async () => {
    const mdToHtml = async version => {
        let pathAll = await readdir( path.join(PATH_TO_INPUT_DIR,version ));
        let customStatsAll = await Promise.all( pathAll.map( async fileOrDirPath => {
            let stats = await fs.promises.stat( PathUtils.toAbsolutePath( path.join( path.join( PATH_TO_INPUT_DIR, version ), fileOrDirPath ) ) );


            return ( {
                name: fileOrDirPath,
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory()
            } );
        } ) );



        let dirnameAll = customStatsAll
            .filter( stats => stats.isDirectory )
            .map( stats => stats.name );
        let filenameAll = customStatsAll
            .filter( stats => stats.isFile )
            .map( stats => stats.name );



        let filePromiseAll = filenameAll.map( async filename => {
            const INPUT_FILENAME = PathUtils.toFilename( filename, PathUtils.MD_EXT );
            const OUTPUT_FILENAME = TranslitUtils.translitRusToEng( INPUT_FILENAME );

            const INPUT_FILE_PATH = PathUtils.toAbsolutePath( PATH_TO_INPUT_DIR, version, PathUtils.toMD( INPUT_FILENAME ) );

            const OUTPUT_DIR_PATH = path.join( PATH_TO_OUTPUT_DIR, version );
            const OUTPUT_FILE_PATH = path.join( OUTPUT_DIR_PATH, PathUtils.toHTML( OUTPUT_FILENAME ) );


            await createDirectoryIfItDoesNotExist( OUTPUT_DIR_PATH );


            let buffer = await readFile( INPUT_FILE_PATH );

            let data = buffer.toString();
            let file = await processor.process( data );

            let text = file.toString();

            const format = compose(
                AddPathToLinkFormatter.format,
                AddCopySubchapterLinkToBufferButtonAfterH2Formatter.format,
                SplitIntoSectionFormatter.format,
                ImageLinkFormatter.format,
            );

            let html = format( text );

            let promise = FsUtils.writefile( OUTPUT_FILE_PATH, html );


            return promise;
        } );

        let dirPromiseAll = dirnameAll.map( dirname => {
            const INPUT_FILE_PATH = PathUtils.toAbsolutePath( PATH_TO_INPUT_DIR, version, dirname );
            const OUTPUT_DIR_PATH = path.join( PATH_TO_OUTPUT_DIR, version, dirname );

            let promise = copydir( INPUT_FILE_PATH, OUTPUT_DIR_PATH );


            return promise;
        } );


        await Promise.all( [
            ...filePromiseAll,
            ...dirPromiseAll
        ] )
                     .catch( error => console.log( error.message ) );
    };



    let versionDirAll = await readdir( PATH_TO_INPUT_DIR );


    await Promise.all( versionDirAll.map( noteDirPath => mdToHtml( path.join( noteDirPath ) ) ) );
};


module.exports = { action };