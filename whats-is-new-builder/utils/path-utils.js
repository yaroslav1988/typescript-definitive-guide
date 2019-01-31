const path = require( 'path' );


const CWD = process.cwd();

const MD_EXT = ".md";
const HTML_EXT = ".html";
const PUG_EXT = ".pug";
const DOCX_EXT = ".docx";

const toMD = filename => filename + MD_EXT;
const toHTML = filename => filename + HTML_EXT;
const toDOCX = filename => filename + DOCX_EXT;

const toAbsolutePath = ( ...paths ) => path.join( CWD, ...paths );

const toFilename = ( filename, ext = '' ) => {
    return path.basename( filename ).replace( ext === '' ? /\.[^.]*$/ : ext, '' );
};

module.exports = {
    CWD,

    MD_EXT,
    HTML_EXT,
    PUG_EXT,
    DOCX_EXT,

    toMD,
    toHTML,
    toDOCX,

    toAbsolutePath,
    toFilename
};