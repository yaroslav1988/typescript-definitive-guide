const path = require( 'path' );

const del = require( 'del' );

const EnvUtils = require( '../utils/env-utils' );



const CLEAR_PATH_ALL = EnvUtils.getArray( 'clear_before_build_path_all' )
                               .map( dirpath => path.join( process.cwd(), ...dirpath.split( '/' ) ) );


del( CLEAR_PATH_ALL )
    .then( () => console.info( `[CLEAR FILES] done.` ) );
