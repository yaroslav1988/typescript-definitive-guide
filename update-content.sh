#!/usr/bin/env bash

if [ -d ./temporary  ]; then
echo "> contents is exists"
exit 0
fi

git clone --branch=master git@github.com:nauchikus/typescript-definitive-guide.git temporary


echo '> load last version contents from github'