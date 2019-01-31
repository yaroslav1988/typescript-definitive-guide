const fs = require( 'fs' );
const path = require( 'path' );

const PathUtils = require( './path-utils' );

const readfile = filepath => fs.promises.readFile( filepath );
const readdir = async path => await fs.promises.readdir( path );

const writefile = async ( filepath, data ) => {
    let pathdir = path.dirname( filepath );

    try {
        await fs.promises.stat( pathdir );
    }catch {
        await createDirectoryIfItDoesNotExist( pathdir );
    }


    return fs.promises.writeFile( filepath, data );
};

const customStats = async dirpath => {
    let pathAll = await readdir( dirpath );


    return Promise.all( pathAll.map( async fileOrDirPath => {
        let stats = await fs.promises.stat( path.join( dirpath, fileOrDirPath ) );


        return Promise.resolve({
            name: fileOrDirPath,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory()
        });
    } ) );
};


const createDirectoryIfItDoesNotExist = dirpath => fs.promises.mkdir( dirpath, { recursive: true } );



module.exports = {
    readfile,
    readdir,
    writefile,
    customStats,
};