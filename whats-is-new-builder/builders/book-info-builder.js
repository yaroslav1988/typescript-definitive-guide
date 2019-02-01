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
const IMAGES_DIRNAME = 'images';

async function build(){
    let versionAll = await FsUtils.readdir( PATH_TO_DIR_WITH_HTML );

    versionAll = versionAll
        .filter( name => path.extname( name ) !== '.json' && name !== IMAGES_DIRNAME );


    let infoPromiseAll = versionAll.map( async version => {
        console.log(path.join( PATH_TO_DIR_WITH_HTML, version ),version)


        let noteBuffer = await FsUtils.readfile( path.join( PATH_TO_DIR_WITH_HTML, version ) );
        let noteData = noteBuffer.toString();

        let chapterName = version;
        let subchapterAll = SubchapterParser.parse( noteData );


        let info = { chapterName, subchapterAll };

        return info;
    } );

    return Promise.all( infoPromiseAll );
}


module.exports = { build };

