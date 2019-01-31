function render ( template,map ) {
    return Object.keys( map ).reduce( ( template, key ) => {
        let data = map[ key ];
        let regexp = new RegExp( `{\\s*{\\s*${key}\\s*}\\s*}`, 'g' );

        template = template.replace( regexp, data );


        return template;
    }, template );
}

module.exports = { render };