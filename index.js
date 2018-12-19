const MdToHtmlAction = require( './book-builder/actions/md-to-html-action' );
const CreateBookContentsInfoAction = require( './book-builder/actions/create-book-contents-info-action' );

const TestModule = require( './test-module' );

const build = async () => {
    TestModule.func();
    await MdToHtmlAction.action();
    await CreateBookContentsInfoAction.action();
};


module.exports = { build };