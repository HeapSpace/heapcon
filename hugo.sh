#!/usr/bin/env bash

set -e

include () {
    [[ -f "$1" ]] && source "$1"
}

include ".env"

#node index.js

hugo --gc --minify "$@"

sed -i "s/ADMIN_PASSWORD/${ADMIN_PASSWORD}/g" public/_headers
