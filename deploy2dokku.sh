#!/bin/bash

PROJECT_NAME=react-static-template
OUT_FOLDER=dist

yarn ; yarn build:min
rm -rf tmp ; git clone --depth 1 https://github.com/SE7ENSKY/heroku-react-template.git tmp
( cd tmp ; rm -rf .git ; rm -rf public )
cp -r $OUT_FOLDER tmp/public
cd tmp
git init ; git remote add dokku dokku@app.se7ensky.com:$PROJECT_NAME
git add . ; git commit -m 'auto deploy2dokku' ; git push -f dokku master
cd ..
rm -rf tmp
