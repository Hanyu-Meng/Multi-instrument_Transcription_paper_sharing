#!/bin/sh
# Publish the reviewed static website without requiring GitHub workflow scope.
set -eu
cd "$(git rev-parse --show-toplevel)"
if [ -n "$(git status --porcelain)" ]; then
  echo 'Commit your changes before publishing.' >&2
  exit 1
fi
node --check site/assets/app.js
node --check site/assets/content.js
node scripts/check.mjs
node scripts/export-guide.mjs
git diff --exit-code docs/PRESENTER_GUIDE.md
git push origin HEAD:main
pages_commit=$(git subtree split --prefix=site HEAD)
git push origin "$pages_commit:refs/heads/gh-pages"
echo 'Published source and gh-pages. GitHub Pages will update after its build completes.'
