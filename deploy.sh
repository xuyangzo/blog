#!/usr/bin/env sh

echo 'Start Deploying'

# create static files
echo 'vuepress build blogs'
yarn docs:build

# move into the dist file
echo "move forwards..."
cd ./blogs/.vuepress/dist

# track all changes
echo "git add ."
git add .

# commit changes
echo "git commit -m 'deploy'"
git commit -m 'deploy'

# push changes
echo "git push"
git push

# 返回到上一次的工作目录
echo "Done!"
cd -