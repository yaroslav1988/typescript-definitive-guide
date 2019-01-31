const fs = require( 'fs' );

const textract = require( 'textract' );

const EnvUtils = require( '../utils/env-utils' );
const PathUtils = require( '../utils/path-utils' );
const OperatorUtils = require( '../utils/operator-utils' );



const PATH_TO_DIR_WITH_DOCX_FILES = EnvUtils.getProp('path_to_dir_with_docx');
const PATH_TO_DIR_WITH_MD_FILES = EnvUtils.getProp('path_to_dir_with_md');

const DOCX_EXCLUDE_FILES = EnvUtils.getArray('docx_exclude_all');



const extractText = filepath => new Promise( ( resolve, reject ) => {
    textract.fromFileWithPath( filepath, ( error, text ) => {
        if ( error ) {
            reject( error );
        } else {
            resolve( text );
        }
    } );
} );


fs.promises.readdir( PATH_TO_DIR_WITH_DOCX_FILES )
  .then( filenameAll => filenameAll
      .filter( OperatorUtils.isNot( OperatorUtils.isExclude( DOCX_EXCLUDE_FILES ) ) )
      .map( async ( filename ) => {
          const FILENAME = PathUtils.toFilename( filename );

          const INPUT_PATH = PathUtils.toAbsolutePath(
              PATH_TO_DIR_WITH_DOCX_FILES,
              PathUtils.toDOCX( FILENAME )
          );
          const OUTPUT_PATH = PathUtils.toAbsolutePath(
              PATH_TO_DIR_WITH_MD_FILES,
              PathUtils.toMD( FILENAME )
          );

          let text = await extractText( INPUT_PATH );

          await fs.promises.writeFile( OUTPUT_PATH, text );

          return Promise.resolve()
      } ) )
  .then( promiseAll => Promise.all( promiseAll ) )
  .then( () => {
      console.info( `[INFO] docx to md convert complete.` );
  } );