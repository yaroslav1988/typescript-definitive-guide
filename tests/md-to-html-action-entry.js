const MdToHtmlAction = require( '../whats-is-new-builder/actions/md-to-html-action' );


MdToHtmlAction.action()
              .then( () => console.log( '[entry MdToHtmlAction] Done!' ) )
              .catch( error => console.log( error.message ) );
