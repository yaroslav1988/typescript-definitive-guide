const MdToHtmlAction = require( './what-is-new-builder/actions/md-to-html-action' );
const BuildPartIntoSingleFileAction = require( './what-is-new-builder/actions/build-part-into-single-file-action' );
const DeleteTemporaryDirectoryAction = require( './what-is-new-builder/actions/delete-temporary-directory-action' );
const CreateBookContentsInfoAction = require( './what-is-new-builder/actions/create-book-contents-info-action' );


const build = async () => {
    await MdToHtmlAction.action();
    await BuildPartIntoSingleFileAction.action();
    await DeleteTemporaryDirectoryAction.action();
    await CreateBookContentsInfoAction.action();
};


module.exports = { build };