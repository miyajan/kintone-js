#!/bin/bash -eux

git config --global user.email "${GIT_USER_EMAIL}"
git config --global user.name "${GIT_USER_NAME}"
git clone --quiet --branch=gh-pages https://github.com/miyajan/kintone-js.git gh-pages
