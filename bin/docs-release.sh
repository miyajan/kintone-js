#!/bin/bash -eux

cd gh-pages
git add -f .
git commit -m "${GIT_COMMIT_MESSAGE}"
git push -fq origin gh-pages
