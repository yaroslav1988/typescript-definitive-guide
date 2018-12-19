const fs = require( 'fs' );
const path = require( 'path' );

const unified = require( 'unified' );
const markdown = require( 'remark-parse' );
const html = require( 'remark-html' );
const highlight = require( 'remark-highlight.js' );

const EnvUtils = require( '../utils/env-utils' );
const TranslitUtils = require( '../utils/translit-rus-to-eng' );
const PathUtils = require( '../utils/path-utils' );
const compose = require( '../utils/compose' );


/* formatters */
const SplitIntoSectionFormatter = require( '../formatters/split-into-section-formatter' );
const AddCopySubchapterLinkToBufferButtonAfterH2Formatter = require( '../formatters/add-copy-subchapter-link-to-buffer-button-after-h2-formatter' );
const AddPathToLinkFormatter = require( '../formatters/add-path-to-link-formatter' );
const ImageLinkFormatter = require( '../formatters/image-link-formatter' );
/* ---------- */

function addClassToInlineCode(){
    return function (node,file){
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
function addIdToH2(){
    return function (node,file){
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
function addClass(){
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

    return function (node,file){
        const parse = node => {
            if ( node.children ) {
                node.children.forEach( parse );
            }
            if ( node.type === 'list' ) {
                addClass(node).data.hProperties.className.push( 'book__list' );
            }
            if ( node.type === 'listItem' ) {
                addClass(node).data.hProperties.className.push( 'book__list__item' );
            }
            if ( node.type === 'image' ) {
                addClass(node).data.hProperties.className.push( 'book__image' );
            }
        };

        parse( node );


        return node;
    }
}

const processor = unified(  )

    .use( markdown )
    .use( highlight )
    .use( addClassToInlineCode )
    .use( addClass )
    // .use( addIdToH2 )
    .use( html )



const PATH_TO_BOOK_DIR = PathUtils.toAbsolutePath(EnvUtils.getProp('path_to_book_dir'));
const PATH_TO_INPUT_DIR = EnvUtils.getProp('path_to_dir_with_md');
const PATH_TO_OUTPUT_DIR = PathUtils.toAbsolutePath( EnvUtils.getProp('path_to_dir_with_html') );



const readFile = filepath => fs.promises.readFile( filepath );

// ekskurs_v_tipizacziyu_-_silьnaya_i_slabaya_tipizacziya


// const createDirectoryIfItDoesNotExist = dirpath => new Promise( async ( resolve, reject ) => {
//     await fs.promises.stat( dirpath )
//             .catch( async error => {
//                 await fs.promises.mkdir( dirpath );
//             } )
//             // .finally( resolve );
// } );
// const createDirectoryIfItDoesNotExist =
//     async dirpath => fs.promises.stat( dirpath )
//                        .catch( async () => {
//                            await fs.promises.mkdir( dirpath );
//                        } );
const createDirectoryIfItDoesNotExist = dirpath => fs.promises.mkdir( dirpath, { recursive: true } );

fs.promises.readdir( PathUtils.toAbsolutePath( PATH_TO_INPUT_DIR ) )
  .then( async filenameAll => {
      await createDirectoryIfItDoesNotExist( PATH_TO_BOOK_DIR );
      await createDirectoryIfItDoesNotExist( PATH_TO_OUTPUT_DIR );

      return filenameAll
  } )
  .then( filenameAll => {
      return filenameAll.reduce( async ( promise, filename ) => {
          const INPUT_FILENAME = PathUtils.toFilename( filename, PathUtils.MD_EXT );
          const OUTPUT_FILENAME = TranslitUtils.translitRusToEng( INPUT_FILENAME );

          const INPUT_FILE_PATH = PathUtils.toAbsolutePath( PATH_TO_INPUT_DIR, PathUtils.toMD( INPUT_FILENAME ) );

          const OUTPUT_FILE_PATH = path.join( PATH_TO_OUTPUT_DIR, PathUtils.toHTML( OUTPUT_FILENAME ) );




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

          let result = await fs.promises.writeFile( OUTPUT_FILE_PATH, html );



          return promise.then( () => result );
      }, Promise.resolve() );
  } );