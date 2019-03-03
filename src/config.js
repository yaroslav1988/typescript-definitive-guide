const path = require( 'path' );

const NODE_ENV = process.env.NODE_ENV;
// get builder config

const [ , , ...argv] = process.argv;
const args = argv.reduce((result, current)=> {
    let [ , key, value] = current.match(/--(.*?)=(.*)/);

    return Object.assign(result,{[key]: value});
}, {});

const DEFAUIL_PROD_BUILDER_CONFIG = './builder.prod.config.js';
const DEFAUIL_DEV_BUILDER_CONFIG = './builder.dev.config.js';

const isProd = env => env === 'production';
const getDefaultConfig = () => isProd( NODE_ENV ) ? DEFAUIL_PROD_BUILDER_CONFIG : DEFAUIL_DEV_BUILDER_CONFIG;


const PATH_TO_CONFIG = args.config || getDefaultConfig(  );
const RELATIVE_PATH_TO_CONFIG = path.relative( './src', PATH_TO_CONFIG );


const BOOK_CONFIG = require( RELATIVE_PATH_TO_CONFIG );

// ==================


const PREFIX_PATH = NODE_ENV === 'production' ? BOOK_CONFIG.prodAssetsLinkPrefix : '';
const APP_ORIGIN = BOOK_CONFIG.origin;




module.exports = {
    PREFIX_PATH,
    BOOK_CONFIG,
    APP_ORIGIN
};