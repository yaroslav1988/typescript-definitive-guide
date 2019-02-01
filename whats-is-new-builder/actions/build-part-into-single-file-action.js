const fs = require( 'fs' );
const path = require( 'path' );
const util = require( 'util' );

const copydir = util.promisify( require( 'copy-dir' ) );

const EnvUtils = require( '../utils/env-utils' );
const TranslitUtils = require( '../utils/translit-rus-to-eng' );
const PathUtils = require( '../utils/path-utils' );
const compose = require( '../utils/compose' );


const FsUtils = require( '../utils/fs' );



// const PATH_TO_BOOK_DIR = PathUtils.toAbsolutePath( EnvUtils.getProp( 'path_to_book_dir' ) );
// const PATH_TO_INPUT_DIR = EnvUtils.getProp( 'path_to_dir_with_md' );
const PATH_TO_INPUT_DIR = PathUtils.toAbsolutePath( EnvUtils.getProp( 'path_to_dir_with_temporary_html' ) );
const PATH_TO_OUTPUT_DIR = PathUtils.toAbsolutePath( EnvUtils.getProp( 'path_to_dir_with_html' ) );

const CONTENTS_FILENAME = 'contents.html';
const IMAGES_DIRNAME = 'images';


const htmlSectionTemplate = ( {nameRus, nameEng, content} ) => ( `
    <section id="${nameEng}" name="${nameRus}" class="subchapter">
        <h2 class="subchapter-title">
            <button class="subchapter-title__button__copy-to-buffer copy-to-buffer" data="${nameEng}" type="absolute-url">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <use href="#icon_link"/>
                </svg>
            </button>
            ${nameRus}
        </h2>
        <hr>
        ${ content }
    </section>
` ).trim();

const action = async () => {
    const build = async version => {
        const FILE_EXTENSION = '.html';
        const CURRENT_VERSION_DIR_PATH = path.join( PATH_TO_INPUT_DIR, version );


        let stats = await FsUtils.customStats( CURRENT_VERSION_DIR_PATH );
        let isContentsExistsValid = stats.some( stats => stats.name === CONTENTS_FILENAME );
        let isImageExistsValid = stats.some( stats => stats.name === IMAGES_DIRNAME );

        if ( !isContentsExistsValid ) {
            throw new Error( `[action BuildPartIntoSingleFileAction] Required file 'contents.html' not found.` );
        }



        let contentsBuffer = await FsUtils.readfile( path.join( CURRENT_VERSION_DIR_PATH, CONTENTS_FILENAME ) );
        let contentsHtmlData = contentsBuffer.toString();
        let contentsData = contentsHtmlData.replace( /<\/?p>/g, '' );
        let contentsAll = contentsData
            .split( /\n/ )
            .filter( item => item.length )
            .map( item => item.trim() );

        // console.log( '<<<');

        let resultHtmlDataPromiseAll = await contentsAll.map( async filename => {
            let filenameEng = TranslitUtils.translitRusToEng( filename );


            let fileBuffer = await FsUtils.readfile( path.join(
                CURRENT_VERSION_DIR_PATH,
                filenameEng + FILE_EXTENSION
            ) );
            let fileData = fileBuffer.toString();


            return htmlSectionTemplate( {
                nameRus: filename,
                nameEng: filenameEng,
                content: fileData
            } );
        } );

        let resultPartHtmlDataAll = await Promise.all( resultHtmlDataPromiseAll );
        let resultHtmlData = resultPartHtmlDataAll.join( '\n' );


        const VERSION_NORMALIZE = TranslitUtils.translitRusToEng( version );

        const OUTPUT_DIR_PATH = path.join( PATH_TO_OUTPUT_DIR );
        const OUTPUT_FILENAME = PathUtils.toHTML(
            TranslitUtils.translitRusToEng( version )
        );



        let resultPromiseAll = [
            FsUtils.writefile( path.join( OUTPUT_DIR_PATH, OUTPUT_FILENAME ), resultHtmlData )
        ];

        if ( isImageExistsValid ) {
            resultPromiseAll.push( copydir(
                path.join(CURRENT_VERSION_DIR_PATH, IMAGES_DIRNAME),
                path.join(OUTPUT_DIR_PATH, IMAGES_DIRNAME, VERSION_NORMALIZE)
            ) );
        }


        return Promise.all( resultPromiseAll );
    };



    let versionDirAll = await FsUtils.readdir( PATH_TO_INPUT_DIR );

    await Promise.all( versionDirAll.map( version => build( version ) ) );
};


module.exports = { action };