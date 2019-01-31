const path = require( 'path' );
const fs = require( 'fs' );

const EnvUtils = require( '../utils/env-utils' );
const FsUtils = require( '../utils/fs' );
const PathUtils = require( '../utils/path-utils' );
const TranslitUtils = require( '../utils/translit-rus-to-eng' );

const SubchapterParser = require( '../parsers/subchapter-parser' );

const PATH_TO_DIR_WITH_HTML = PathUtils.toAbsolutePath( EnvUtils.getProp( 'path_to_dir_with_html' ) );
const PATH_TO_INPUT_FILE_WITH_BOOK_CONTENTS = PathUtils.toAbsolutePath(
    EnvUtils.getProp( 'path_to_input_file_with_book_contents' ) );
const NOTE_FILENAME = EnvUtils.getProp( 'note_filename' );

async function build(){
    let versionAll = await FsUtils.readdir( PATH_TO_DIR_WITH_HTML );

    let infoPromiseAll = versionAll.map( async version => {
        let noteBuffer = await FsUtils.readfile( path.join( PATH_TO_DIR_WITH_HTML, version, NOTE_FILENAME ) );
        let noteData = noteBuffer.toString();

        let chapterName = version;
        let subchapterAll = SubchapterParser.parse( noteData );


        let info = { chapterName, subchapterAll };

        return info;
    } );

    return Promise.all( infoPromiseAll );
}


module.exports = { build };

