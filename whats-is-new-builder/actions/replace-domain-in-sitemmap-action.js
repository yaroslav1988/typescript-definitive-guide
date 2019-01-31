const path = require( 'path' );
const fs = require( 'fs' );

const EnvUtils = require( '../utils/env-utils' );

const ROOT_PATH = process.cwd();

const SITEMAP_PATH = path.join( ROOT_PATH, 'public', 'sitemap.xml' );

const FROM_DOMAIN = EnvUtils.getProp( 'fromDomain' );
const TO_DOMAIN = EnvUtils.getProp( 'toDomain' );


if ( !FROM_DOMAIN || FROM_DOMAIN === '' && !TO_DOMAIN || TO_DOMAIN === '' ) {
    throw new Error( `check domain values! "fromDomain": "${FROM_DOMAIN}", "toDomain": "${TO_DOMAIN}".` );
}

async function replaceDomain ( fromDomain, toDomain ) {
    let sitemapBuffer = await fs.promises.readFile( SITEMAP_PATH );
    let sitemap = sitemapBuffer.toString();

    let regexp = new RegExp( `${FROM_DOMAIN}`, 'g' );

    sitemap = sitemap.replace( regexp, toDomain );

    await fs.promises.writeFile( SITEMAP_PATH, sitemap );
}


replaceDomain( FROM_DOMAIN, TO_DOMAIN );