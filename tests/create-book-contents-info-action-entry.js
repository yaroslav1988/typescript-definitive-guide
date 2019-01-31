const MdToHtmlAction = require( '../whats-is-new-builder/actions/create-book-contents-info-action' );


MdToHtmlAction.action()
              .then( () => console.log( '[entry CreateBookContentsInfoAction] Done!' ) )
              .catch( error => console.log( error.message ) );
