const Index = require( '../index' );

Index.build()
    .then( () => console.log( '[entry Index] Done!' ) )
    .catch( error => console.log( error.message ) );