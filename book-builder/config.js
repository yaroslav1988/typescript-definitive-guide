const EnvUtils = require( '../utils/env-utils' );

const NODE_ENV = process.env.NODE_ENV;
const PREFIX_PATH = NODE_ENV === 'production' ? EnvUtils.getProp( 'prod_assets_link_prefix' ) : '/';

module.exports = {
    PREFIX_PATH
};