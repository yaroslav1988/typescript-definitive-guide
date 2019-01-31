const fs = require( 'fs' );

const EnvUtils = require( '../utils/env-utils' );
const FsUtils = require( '../utils/fs' );
const PathUtils = require( '../utils/path-utils' );

const BookInfoBuilder = require( '../builders/book-info-builder' );
const BookInfoToBookPageInfoDecorator = require( '../decorators/book-info-to-book-page-info-decorator' );

const PATH_TO_BOOK_DIR = EnvUtils.getProp( 'path_to_book_dir' );
const PATH_TO_BOOK_CONTENTS_DIR = EnvUtils.getProp( 'path_to_book_contents_dir' );
const PATH_TO_DIR_WITH_HTML = EnvUtils.getProp( 'path_to_dir_with_html' );
const PATH_TO_OUTPUT_FILE_WITH_BOOK_CONTENTS = PathUtils.toAbsolutePath(
    EnvUtils.getProp( 'path_to_output_file_with_book_contents' )
);


const action = async () => {
    let noteContentsInfo = await BookInfoBuilder.build( PathUtils.toAbsolutePath( PATH_TO_DIR_WITH_HTML ) );

    let notePageInfo = await BookInfoToBookPageInfoDecorator.decorate( noteContentsInfo );


    await FsUtils.writefile( PATH_TO_OUTPUT_FILE_WITH_BOOK_CONTENTS, JSON.stringify( notePageInfo ) );


    console.info( `[INFO] book contents info complete.` )
};


module.exports = { action };

