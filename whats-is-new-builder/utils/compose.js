function compose(...f){
    return f.reduce( ( result, current ) => (...rest) => result( current(...rest) ) );
}

module.exports = compose;