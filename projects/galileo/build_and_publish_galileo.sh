#!/bin/bash

type="$1"

npm_version_type=""
# Exit if project is not specified
if [ -z "$type" ]; then
    echo -e "Please pass the npm version type. major, minor or patch"
    exit 1
fi

if [ "$type" != "major" ] && [ "$type" != "minor" ] && [ "$type" != "patch" ]; then
  echo -e "Argument must be 'major' or 'minor' or 'patch'"
fi


if [ "$type" = "major" ]; then
    npm_version_type="major"
fi

if [ "$type" = "minor" ]; then
    npm_version_type="minor"
fi

if [ "$type" = "patch" ]; then
    npm_version_type="patch"
fi

npm version $npm_version_type
cd ..
cd ..
ng build galileo --prod
cd dist/galileo
npm publish --access public
