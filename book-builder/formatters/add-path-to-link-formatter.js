const TranslitUtils = require( '../utils/translit-rus-to-eng' );

function format(html){
    // return html.replace( /<a.*?href="".*?>(?:[“|”|"|']?)(.*?)(?:[“|”|"|']?)<\/a>/g, `<a class="book__chapter__chapter-link" href="/book/contents/$1.html" title="$1">$1</a>`);
    return html
        .replace( /<a.*?\/a>/g, matches => {
            let [link] = matches.match( /<a.*?>(?:[“|”|"|']?)(.*?)(?:[“|”|"|']?)<\/a>/g );
            let [ , content ] = link.match( />[“|”|"|']?(.*?)[“|”|"|']?</ );
            let path = content.replace( /\\/, ' и ' );
            let pathEng = TranslitUtils.translitRusToEng( content );

            let template = `<a class="book__chapter__chapter-link" ref="/book/contents/${pathEng}" title="${content}">${content}</a>`

            return template;
        })
}

module.exports = { format };
//
// console.log(format(`
//
// <a href="">“Типы - Обобщения (Generics)”</a>
// <a href="">“Ссылка на файл“</a>
// <a href="">"Ссылка на файл"</a>
// <a href="">'Ссылка на файл'</a>
// <a href="">Ссылка на файл</a>
// <a href="http:">1</a>
// `))
