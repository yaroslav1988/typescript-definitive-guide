const TranslitUtils = require( '../utils/translit-rus-to-eng' );

function format(html){
    // return html.replace( /<h2>(.*)?<\/h2>/g, '<h2 class="subchapter-title"><button class="subchapter-title__button__copy-to-buffer copy-to-buffer" data="book/contents/Аннотация%20типов.html#$1" type="absolute-url"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><use href="#icon_link"/></svg></button>$1</h2>' );
    return html.replace( /<h2>(.*)?<\/h2>/g, matches => {
        let [, content] = matches.match( /<h2>(.*)?<\/h2>/ );
        let contentEng = TranslitUtils.translitRusToEng( content );

        let template = `
            <h2 class="subchapter-title">
                <button class="subchapter-title__button__copy-to-buffer copy-to-buffer" data="${ contentEng }" type="absolute-url">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <use href="#icon_link"/>
                    </svg>
                </button>
                ${ content }
            </h2>
        `;


        return template;
    });
}


module.exports = { format };


// console.log(format(`<h2>Привет</h2>`))
