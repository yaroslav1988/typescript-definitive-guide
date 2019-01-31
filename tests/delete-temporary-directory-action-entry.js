const MdToHtmlAction = require( '../what-is-new-builder/actions/delete-temporary-directory-action' );


MdToHtmlAction.action()
              .then( () => console.log( '[entry DeleteTemporaryDirectoryAction] Done!' ) )
              .catch( error => console.log( error.message ) );
