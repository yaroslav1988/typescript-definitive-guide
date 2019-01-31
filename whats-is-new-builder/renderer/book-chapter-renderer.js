const fs = require( 'fs' );
const path = require( 'path' );

const EnvUtils = require( '../utils/env-utils' );
const PathUtils = require( '../utils/path-utils' );

const PrePugEngine = require( '../utils/pre-pug-engine' );



const PATH_TO_INPUT_PUG_FILE_WITH_BOOK_CHAPTER = PathUtils.toAbsolutePath(
    EnvUtils.getProp( 'path_to_input_pug_file_with_book_chapter' )
);
const PATH_TO_OUTPUT_PUG_FILE_WITH_BOOK_CHAPTER = PathUtils.toAbsolutePath(
    EnvUtils.getProp( 'path_to_output_pug_file_with_book_chapter' )
);

const PATH_TO_DIR_WITH_HTML = PathUtils.toAbsolutePath(
    EnvUtils.getProp( 'path_to_dir_with_html' )
);

const BOOK_CHAPTER_CONTENT_EXTENSION = EnvUtils.getProp( 'book_chapter_content_extension' );
const BOOK_CHAPTER_PAGE_EXTENSION = EnvUtils.getProp( 'book_chapter_page_extension' );


async function render(bookPageInfoAll){
    try {
        let sourcePageTemplateBuffer = await fs.promises.readFile( PATH_TO_INPUT_PUG_FILE_WITH_BOOK_CHAPTER );
        let sourcePageTemplate = sourcePageTemplateBuffer.toString();

        let promiseAll = bookPageInfoAll.map( async ({name: bookChapterContentFileName}) => {
            let bookChapterContentFilePath = path.join(
                PATH_TO_DIR_WITH_HTML,
                bookChapterContentFileName + BOOK_CHAPTER_CONTENT_EXTENSION
            );
            let resolveBookChapterContentFilePath = path.relative(
                PATH_TO_OUTPUT_PUG_FILE_WITH_BOOK_CHAPTER,
                bookChapterContentFilePath
            );
            let map = {
                CHAPTER_NAME: bookChapterContentFileName,
                BOOK_CHAPTER_CONTENT_FILE_PATH_MARK: resolveBookChapterContentFilePath
            };

            let resultPageTemplate = PrePugEngine.render( sourcePageTemplate, map );
            let bookChapterPageFilePath = path.join(
                PATH_TO_OUTPUT_PUG_FILE_WITH_BOOK_CHAPTER,
                bookChapterContentFileName + BOOK_CHAPTER_PAGE_EXTENSION
            );

            let promise = fs.promises.writeFile( bookChapterPageFilePath, resultPageTemplate );


            return promise;
        } );

        return Promise.all( promiseAll );
    }catch ( error ) {
        console.error( error );
    }
}


module.exports = { render };

