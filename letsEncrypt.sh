#!/bin/bash

# ssl 인증서를 받는 certbot 설치
sudo snap install --classic certbot
sudo certbot certonly --standalone

# cron 설치
sudo apt update -y
sudo apt install -y cron

# cron 시작
sudo service cron start

# cron systemctl 활성화
sudo systemctl enable cron.service

# cron systemctl 등록 확인
sudo systemctl list-unit-files | grep cron
sudo service cron status

# crontab에 등록하기
sudo crontab -e

# 2개월마다 1일에 인증서를 갱신하고 pm2로 서버를 재시작 하겠다는 뜻
0 0 1 */2 * /usr/bin/certbot renew --renew-hook="sudo pm2 restart app"

# 잘 등록되었는지 목록 확인
sudo crontab -l

# crontab 실행 로그 확인
view /var/log/syslog