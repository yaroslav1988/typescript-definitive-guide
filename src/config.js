const path = require( 'path' );

const NODE_ENV = process.env.NODE_ENV;
// get builder config

const [ , , ...argv] = process.argv;
const args = argv.reduce((result, current)=> {
    let [ , key, value] = current.match(/--(.*?)=(.*)/);

    return Object.assign(result,{[key]: value});
}, {});

const isProd = env => env === 'production';
const getDefaultConfig = () => process.env[ `npm_package_config_config${ isProd( NODE_ENV ) ? 'Prod' : 'Dev' }` ];


console.log('args.config',process.env )
const PATH_TO_CONFIG = args.config || getDefaultConfig(  );
const RELATIVE_PATH_TO_CONFIG = path.relative( './src', PATH_TO_CONFIG );


const BOOK_CONFIG = require( RELATIVE_PATH_TO_CONFIG );

// ==================


const PREFIX_PATH = NODE_ENV === 'production' ? BOOK_CONFIG.prodAssetsLinkPrefix : '';




module.exports = {
    PREFIX_PATH,
    BOOK_CONFIG
};