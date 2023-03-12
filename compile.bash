#!/usr/bin/bash

# HTML Process
for html in `ls ./view | grep -e '.html$'` ; do
    glunt ./view/$html | minify --html > ./output/$html
    echo $html '>> processed'
done

# JS Process
for js in `ls ./view | grep -e '.js$'` ; do
    browserify ./view/$js | minify --js > ./output/$js
    echo $js '>> processed'
done

# CSS Process
for css in `ls ./view | grep -e '.css$'` ; do
    glunt ./view/$css | minify --css > ./output/$css
    echo $css '>> processed'
done