module.exports = {
    origin: 'http://192.168.0.226:1234',
    fromDomain: 'http://192.168.0.226:1234',
    toDomain: 'http://example.ru',
    chapterBaseUrl: 'book/contents/',
    pathToDirWithMd: 'temporary/chapters',
    pathToInputFileWithBookContents: 'temporary/contents.md',
    pathToOutputFileWithBookContents: 'dest/book/contents.json',
    pathToDirWithHtml: 'dest/book/chapters',
    pathToBookDir: 'dest/book',
    pathToBookChaptersDir: 'dest/book/chapters',
    pathToBookContentsDir: 'dest/book',
    bookChapterContentExtension: '.html',
    prodAssetsLinkPrefix: '/typescript-definitive-guide',
    clearBeforeBuildPathAll: [
        'dest/book/**/*.*'
    ]
};