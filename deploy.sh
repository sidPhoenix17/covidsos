#!/bin/bash -e

url=https://stg.covidsos.org
env=stg

echo $url

REACT_APP_ENV=$env npm run build
cd build
tar -zcvf build.tar.gz *
echo "---------"
rm -rf /var/www/html-new/*
cp build.tar.gz /var/www/html-new/
cd /var/www/html-new/ && tar -xvf build.tar.gz && rm build.tar.gz
echo "---------"
rm -rf /var/www/html/* && mv /var/www/html-new/* /var/www/html/
echo "---------"
cd ../

cp public/volunteer.html /var/www/html-meta/

echo ""
echo ""
echo "Link: "$url
echo ""
echo ""
date
