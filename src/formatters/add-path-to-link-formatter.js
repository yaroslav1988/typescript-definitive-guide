const TranslitUtils = require( '../utils/translit-rus-to-eng' );
const { PREFIX_PATH } = require( '../config' );


function format(html){
    return html
        .replace( /<a.*?\/a>/g, matches => {
            let [link] = matches.match( /<a.*?>(?:[“|”|"|']?)(.*?)(?:[“|”|"|']?)<\/a>/g );
            let [ , externalResourceHref ] = link.match( /href="(.*?)"/ );

            let [ , content ] = link.match( />[“|”|"|']?(.*?)[“|”|"|']?</ );
            let path = content.replace( /\\/, ' и ' );
            let pathEng = TranslitUtils.translitRusToEng( content );


            let href = externalResourceHref || `/book/contents/${pathEng}`;
            let template = `<a class="book__chapter__chapter-link" href="${href}" title="${content}">${content}</a>`

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
