#!/bin/bash


if [ -d ./public/book ] && [ -d ./public/whats-is-new ]; then
echo "> contents is exists"
exit 0
fi

git clone --branch=gh-pages git@github.com:nauchikus/typescript-definitive-guide.git temporary

cp -rf temporary/book public
cp -rf temporary/whats-is-new public
rm -rf temporary

echo '> load last version contents from github'