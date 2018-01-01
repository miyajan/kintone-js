#!/bin/bash -eux

cd gh-pages
git add -f .
git commit -m "Latest typedoc on CircleCI build ${CIRCLE_BUILD_NUM}"
git push -fq origin gh-pages
