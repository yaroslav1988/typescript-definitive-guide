const path = require( 'path' );

const del = require( 'del' );


const { BOOK_CONFIG } = require( '../config' );

const { clearBeforeBuildPathAll } = BOOK_CONFIG;

const CLEAR_PATH_ALL = clearBeforeBuildPathAll
                               .map( dirpath => path.join( process.cwd(), ...dirpath.split( '/' ) ) );


del( CLEAR_PATH_ALL )
    .then( () => console.info( `[CLEAR FILES] done.` ) );
