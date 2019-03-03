module.exports = {
    fromDomain: 'http://192.168.0.226:1234',
    toDomain: 'http://example.ru',
    chapterBaseUrl: 'book/contents/',
    pathToDirWithMd: 'chapters',
    pathToInputFileWithBookContents: 'contents.md',
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