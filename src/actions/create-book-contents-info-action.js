const fs = require( 'fs' );

const PathUtils = require( '../utils/path-utils' );

const BookInfoBuilder = require( '../builders/book-info-builder' );
const BookInfoToBookPageInfoDecorator = require( '../decorators/book-info-to-book-page-info-decorator' );

const { BOOK_CONFIG } = require( '../config' );


const action = async () => {
    const {
        pathToBookContentsDir: PATH_TO_BOOK_CONTENTS_DIR,
        pathToDirWithHtml: PATH_TO_DIR_WITH_HTML,
        pathToOutputFileWithBookContents
    } = BOOK_CONFIG;

    const PATH_TO_OUTPUT_FILE_WITH_BOOK_CONTENTS = PathUtils.toAbsolutePath(pathToOutputFileWithBookContents);


    let bookContentsInfo = await BookInfoBuilder.build( PathUtils.toAbsolutePath( PATH_TO_DIR_WITH_HTML ) );

    let bookPageInfo = await BookInfoToBookPageInfoDecorator.decorate( bookContentsInfo );

    try {
        await fs.promises.stat( PATH_TO_BOOK_CONTENTS_DIR )
                .catch( error => {
                    throw error
                } );
    } catch ( error ) {
        await fs.promises.mkdir( PATH_TO_BOOK_CONTENTS_DIR, { recursive: true } );
    }

    await fs.promises.writeFile(
        PATH_TO_OUTPUT_FILE_WITH_BOOK_CONTENTS,
        JSON.stringify( bookPageInfo )
    );

    console.info( `[INFO] book contents info complete.` )
};


module.exports = { action };

