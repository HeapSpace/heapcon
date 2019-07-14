#!/usr/bin/env bash

set -x

include() {
    [[ -f "$1" ]] && source "$1"
}

echo "Hello"

include ".env"

#node index.js

echo "Running HUGO"

hugo --gc --minify "$@"

sed -i "s/ADMIN_PASSWORD/${ADMIN_PASSWORD}/g" ./public/_headers
