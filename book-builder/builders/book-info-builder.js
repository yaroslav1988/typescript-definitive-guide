const path = require( 'path' );
const fs = require( 'fs' );

const EnvUtils = require( '../utils/env-utils' );
const PathUtils = require( '../utils/path-utils' );
const TranslitUtils = require( '../utils/translit-rus-to-eng' );

const SubchapterParser = require( '../parsers/subchapter-parser' );

const PATH_TO_DIR_WITH_HTML = EnvUtils.getProp( 'path_to_dir_with_html' )
const PATH_TO_INPUT_FILE_WITH_BOOK_CONTENTS = PathUtils.toAbsolutePath(
    EnvUtils.getProp( 'path_to_input_file_with_book_contents' ) );

function build(){
    return fs.promises.readFile( PATH_TO_INPUT_FILE_WITH_BOOK_CONTENTS )
             .then( filebuffer => {
                 let filedata = filebuffer.toString();
                 let chapterNameRusAll = filedata.split( /\n/ );
                 let chapterNameEngAll = chapterNameRusAll.map( name => TranslitUtils.translitRusToEng( name ) );

                 let chapterNameCombineAll = chapterNameRusAll.map( ( rusname, index ) => ( {
                     rusname,
                     engname: chapterNameEngAll[ index ]
                 } ) );

                 return chapterNameRusAll;
             } )
             .then( chapterNameRusAll => {
                 let resultSyncAll = chapterNameRusAll.map( async chapterNameRus => {
                     let chapterNameEng = TranslitUtils.translitRusToEng( chapterNameRus );
                     let chapterPath = path.join( process.cwd(), PATH_TO_DIR_WITH_HTML, chapterNameEng + '.html' );

                     let chapterBuffer = await fs.promises.readFile( chapterPath );
                     let chapterData = chapterBuffer.toString();

                     let subchapterAll = SubchapterParser.parse( chapterData );


                     let info = { chapterName: chapterNameRus, subchapterAll };


                     return info;
                 } );

                 return Promise.all( resultSyncAll );
             } );
}

// async function build(inputDirPath){
//     let stat = await fs.promises.stat( inputDirPath );
//
//
//
//     if ( stat.isDirectory() ) {
//         let fileNameAll = await fs.promises.readdir( inputDirPath );
//
//
//         let collectChapterInfoPromiseAll = fileNameAll.map( async fileName => {
//             let chapterName = path.basename( fileName, '.html' );
//             let chapterPath = path.join( inputDirPath, fileName );
//
//         } );
//
//         let bookChapterInfoAll = await Promise.all( collectChapterInfoPromiseAll );
//
//         return bookChapterInfoAll;
//     }
//
//
//     throw new Error( `unknown input path: ${inputDirPath}.` );
// }


module.exports = { build };

