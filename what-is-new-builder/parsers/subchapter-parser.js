function parse ( html ) {
    let matchAll = html.match( /<section.*?name=".*?".*?>/g ) || [];



    return  matchAll.map( match => {
        let result = /<section.*?id="(.*?)".*?name="(.*?)".*?>/.exec( match );
        let [ , subchapterId, subchapterName ] = result;


        return {
            subchapterId,
            subchapterName,
        };
    }  )
}


module.exports = { parse };


// console.log(parse(`
// <section id="Utverjdenie-Tipa-Type-sintaksis" name="Утверждение Типа <Type> синтаксис" class="subchapter"></section>
// `))

