#!/usr/bin/env bash
set -e

imageName='egg-ts-template'

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo current package version: "$PACKAGE_VERSION"

npm run pack

npm run genInstallFile

echo docker build -t "$imageName":"$PACKAGE_VERSION" .
docker build -t "$imageName":"$PACKAGE_VERSION" .

npm run clean

# $(aws ecr get-login --no-include-email --region cn-northwest-1)
aws ecr get-login-password | docker login --username AWS --password-stdin 789252305933.dkr.ecr.cn-northwest-1.amazonaws.com.cn

echo docker tag "$imageName":"$PACKAGE_VERSION" 789252305933.dkr.ecr.cn-northwest-1.amazonaws.com.cn/"$imageName":"$PACKAGE_VERSION"
docker tag "$imageName":"$PACKAGE_VERSION" 789252305933.dkr.ecr.cn-northwest-1.amazonaws.com.cn/"$imageName":"$PACKAGE_VERSION"

echo docker push 789252305933.dkr.ecr.cn-northwest-1.amazonaws.com.cn/"$imageName":"$PACKAGE_VERSION"
docker push 789252305933.dkr.ecr.cn-northwest-1.amazonaws.com.cn/"$imageName":"$PACKAGE_VERSION"
