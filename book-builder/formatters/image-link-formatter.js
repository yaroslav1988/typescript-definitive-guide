const EnvUtils = require( '../utils/env-utils' );

const NODE_ENV = process.env.NODE_ENV;
const IMAGE_LINK_PREFIX = NODE_ENV === 'production' ? EnvUtils.getProp( 'prod_assets_link_prefix' ) : '';


function format(html){
    return html.replace( /(<img.*?src=")(.*?)(".*?>)/g, `$1${IMAGE_LINK_PREFIX}$2$3`);
}

module.exports = { format };
//
// console.log(format(`
// <img src="/img/a.png" />
// <img src="/img/a.png" />
// `))
