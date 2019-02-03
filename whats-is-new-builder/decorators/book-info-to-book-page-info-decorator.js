const EnvUtils = require( '../utils/env-utils' );
const TranslitUtils = require( '../utils/translit-rus-to-eng' );

const BOOK_CHAPTER_CONTENT_EXTENSION = EnvUtils.getProp( 'book_chapter_content_extension' );


function decorate(bookChapterInfoAll){
    const ROOT = "/";
    const ANCHOR = "#";

    const toEng = text => TranslitUtils.translitRusToEng( text );


    return bookChapterInfoAll.map( bookChapterInfo => {
        let { chapterName, subchapterAll } = bookChapterInfo;

        let path = TranslitUtils.translitRusToEng(chapterName);


        let children = subchapterAll.map( ({subchapterId, subchapterName}) => {
            return {
                name: subchapterName,
                path: `${path}/${toEng(subchapterId)}`,
                anchor: subchapterId,
            }
        } );

        let bookPageInfo = {
            name: chapterName,
            path,

            children
        };


        return bookPageInfo;
    } )
}

module.exports = { decorate };

