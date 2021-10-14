set -e

yarn build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ajing2020/Project-Huahua-website.git master:gh-pages