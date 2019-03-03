const getName = name => `npm_package_config_${name}`;
const getProp = name => process.env[ getName(name) ];
const getArrayItem = (name, index) => process.env[ `${getName(name)}_${index}` ];

const getLength = propname => {
    for ( let i = 0; true; i++ ) {
        if ( !getArrayItem(propname, i) ) {
            return i;
        }
    }
};
const getArray = propname => {
    let result = [];


    for ( let i = 0, j = getLength( propname ); i < j; i++ ) {
        result.push( getArrayItem(propname, i) );
    }


    return result;
};

module.exports = {
    getArray,
    getArrayItem,
    getLength,

    getProp
};