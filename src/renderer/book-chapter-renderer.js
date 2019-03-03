const fs = require( 'fs' );
const path = require( 'path' );

const PathUtils = require( '../utils/path-utils' );

const PrePugEngine = require( '../utils/pre-pug-engine' );

const { BOOK_CONFIG } = require( '../config' );

const {
    pathToInputPugFileWithBookChapter: PATH_TO_INPUT_PUG_FILE_WITH_BOOK_CHAPTER,
    pathToOutputPugFileWithBookChapter: PATH_TO_OUTPUT_PUG_FILE_WITH_BOOK_CHAPTER,
    pathToDirWithHtml,
    bookChapterContentExtension: BOOK_CHAPTER_CONTENT_EXTENSION,
    bookChapterPageExtension: BOOK_CHAPTER_PAGE_EXTENSION
} = BOOK_CONFIG;


const PATH_TO_DIR_WITH_HTML = PathUtils.toAbsolutePath( pathToDirWithHtml );



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

