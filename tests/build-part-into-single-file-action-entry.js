const buildPartIntoSingleFileAction = require( '../whats-is-new-builder/actions/build-part-into-single-file-action' );

buildPartIntoSingleFileAction.action()
    .then( () => console.log( '[entry BuildPartIntoSingleFileAction] Done!' ) )
    .catch( error => console.log( error.message ) );