const MdToHtmlAction = require( './src/actions/md-to-html-action' );
const CreateBookContentsInfoAction = require( './src/actions/create-book-contents-info-action' );


const run = async () => {
    await MdToHtmlAction.action();
    await CreateBookContentsInfoAction.action();
};


module.exports = { run };