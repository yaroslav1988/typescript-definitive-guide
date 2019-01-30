const { PREFIX_PATH } = require( '../config' );


function format(html){
    return html.replace( /(<img.*?src=")(.*?)(".*?>)/g, `$1${PREFIX_PATH}$2$3`);
}

module.exports = { format };
//
// console.log(format(`
// <img src="/img/a.png" />
// <img src="/img/a.png" />
// `))
