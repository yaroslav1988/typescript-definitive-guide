#!/usr/bin/env node

const shell = require( 'shelljs' );

shell.exec( 'env NODE_ENV=production npm run book:build' );