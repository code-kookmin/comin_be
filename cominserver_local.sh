#!bin/bash

# 이미지 받아옴
docker pull kym8821/comin

CONTAINER=comin

# 현재 실행중인 컨테이너 중 comin이 있으면, 해당 컨테이너 종료 후 삭제
VAR=$(docker ps -a | grep -e $CONTAINER | cut -d " " -f 1 | tr -d '\12')
if [ -n "$VAR" ] ; then
    docker rm -f $VAR
fi

# 이미지 실행
docker run -d --name comin -p 8080:8080 kym8821/comin