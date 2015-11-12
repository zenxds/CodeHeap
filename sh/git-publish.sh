#!/usr/bin/env bash

VER=$1

if [ -z "${VER}" ]
then
    echo "USAGE:"
    echo "./publish.sh VERSION  # VERSION looks like: 1.2.3"
fi

git checkout -b daily/${VER} master
git push origin daily/${VER}
git checkout master
git tag publish/${VER}
git push origin publish/${VER}
