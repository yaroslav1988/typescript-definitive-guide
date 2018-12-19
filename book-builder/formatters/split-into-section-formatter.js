const TranslitUtil = require( '../utils/translit-rus-to-eng' );


function format ( html ) {
    return html.replace( /(\n*<h2.*?>)(.|\n|\r)*?(?=($|<h2.*?>))/g, ( ...matches ) => {
        let [ template ] = matches;
        let matcheAll = /<h2.*?>(.*)<\/h2>/.exec( template ) || [];
        let [ , idRus ] = matcheAll;
        let idEng = TranslitUtil.translitRusToEng( idRus );

        return `<section id="${ idEng }" name="${ idRus }" class="subchapter">${ matches[ 0 ] }</section>`
    } );
}


module.exports = { format };


