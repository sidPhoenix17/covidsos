#!/bin/bash -e

ip=3.6.79.89
url=https://stg.covidsos.org
env=stg
if test "$1" == "prod"; then
  ip=3.6.230.117
  url=https://covidsos.org
  env=prod
fi

echo $ip
echo $url

KEY_PATH=~/.ssh/covid/covid19_sos.pem
REACT_APP_ENV=$env npm run build
cd build
tar -zcvf build.tar.gz *
echo "---------"
ssh -tt -n -i $KEY_PATH ubuntu@$ip "rm -rf /var/www/html-new/*"
scp -i $KEY_PATH build.tar.gz ubuntu@$ip:/var/www/html-new/
ssh -tt -n -i $KEY_PATH ubuntu@$ip "cd /var/www/html-new/ && tar -xvf build.tar.gz && rm build.tar.gz"
echo "---------"
ssh -tt -n -i $KEY_PATH ubuntu@$ip "rm -rf /var/www/html/* && mv /var/www/html-new/* /var/www/html/"
echo "---------"
cd ../

scp -i $KEY_PATH public/volunteer.html ubuntu@$ip:/var/www/html-meta/

echo ""
echo ""
echo "Link: "$url
echo ""
echo ""
date
