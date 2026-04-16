#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist/assets dist/data

# HTML entrypoint + Cloudflare Pages headers
cp index.html dist/
cp _headers   dist/

# Assets actually referenced by index.html
cp assets/favicon.ico            dist/assets/
cp assets/apple-touch-icon.png   dist/assets/
cp assets/og-card.png            dist/assets/
cp assets/tram-train-small.png   dist/assets/

# Data files actually fetched at runtime
cp data/edinburgh-suburban-line.json       dist/data/
cp data/edinburgh-tram.json                dist/data/
cp data/borders-railway.json               dist/data/
cp data/south-sub-original-stations.json   dist/data/
cp data/south-sub-proposed-stations.json   dist/data/
