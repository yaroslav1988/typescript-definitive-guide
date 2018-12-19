const fs = require( 'fs' );

const EnvUtils = require( '../utils/env-utils' );
const PathUtils = require( '../utils/path-utils' );

const BookInfoBuilder = require( '../builders/book-info-builder' );
const BookInfoToBookPageInfoDecorator = require( '../decorators/book-info-to-book-page-info-decorator' );

const PATH_TO_BOOK_DIR = EnvUtils.getProp( 'path_to_book_dir' );
const PATH_TO_BOOK_CONTENTS_DIR = EnvUtils.getProp( 'path_to_book_contents_dir' );
const PATH_TO_DIR_WITH_HTML = EnvUtils.getProp( 'path_to_dir_with_html' );
const PATH_TO_OUTPUT_FILE_WITH_BOOK_CONTENTS = PathUtils.toAbsolutePath(
    EnvUtils.getProp( 'path_to_output_file_with_book_contents' )
);


BookInfoBuilder.build( PathUtils.toAbsolutePath( PATH_TO_DIR_WITH_HTML ) )
               .then(bookContentsInfo=>BookInfoToBookPageInfoDecorator.decorate(bookContentsInfo))
               .then( async bookPageInfo => {
                   try{
                       await fs.promises.stat( PATH_TO_BOOK_CONTENTS_DIR )
                               .catch( error => {
                                   throw error
                               } );
                   }catch ( error ) {
                       await fs.promises.mkdir( PATH_TO_BOOK_CONTENTS_DIR );
                   }

                   await fs.promises.writeFile(
                       PATH_TO_OUTPUT_FILE_WITH_BOOK_CONTENTS,
                       JSON.stringify( bookPageInfo )
                   )
               })
               .then( () => console.info( `[INFO] book contents info complete.` ) );


