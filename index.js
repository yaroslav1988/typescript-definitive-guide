const MdToHtmlAction = require( './whats-is-new-builder/actions/md-to-html-action' );
const BuildPartIntoSingleFileAction = require( './whats-is-new-builder/actions/build-part-into-single-file-action' );
const DeleteTemporaryDirectoryAction = require( './whats-is-new-builder/actions/delete-temporary-directory-action' );
const CreateBookContentsInfoAction = require( './whats-is-new-builder/actions/create-book-contents-info-action' );


const build = async () => {
    await MdToHtmlAction.action();
    await BuildPartIntoSingleFileAction.action();
    // await DeleteTemporaryDirectoryAction.action();
    await CreateBookContentsInfoAction.action();
};


module.exports = { build };