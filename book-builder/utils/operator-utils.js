const isNot = validate => value => !validate( value );

const isExclude = excludeAll => item => excludeAll.includes( item );

module.exports = {
    isNot,
    isExclude
};