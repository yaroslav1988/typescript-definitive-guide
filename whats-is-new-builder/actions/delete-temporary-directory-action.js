const util = require( 'util' );
const rimraf = util.promisify( require( 'rimraf' ) );

const EnvUtils = require( '../utils/env-utils' );
const PathUtils = require( '../utils/path-utils' );



const PATH_TO_OUTPUT_DIR = PathUtils.toAbsolutePath( EnvUtils.getProp( 'path_to_dir_with_temporary_html' ) );


const action = async () => {
    await rimraf( PATH_TO_OUTPUT_DIR );
};


module.exports = { action };