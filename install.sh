#!/bin/bash -e

npm run build
cd build
tar -zcvf build.tar.gz *
echo "---------"
ssh -tt -n -i ~/.ssh/covid/covid19_sos.pem ubuntu@3.6.230.117 "rm -rf /var/www/html-new/*"
scp -i ~/.ssh/covid/covid19_sos.pem build.tar.gz ubuntu@3.6.230.117:/var/www/html-new/
ssh -tt -n -i ~/.ssh/covid/covid19_sos.pem ubuntu@3.6.230.117 "cd /var/www/html-new/ && tar -xvf build.tar.gz && rm build.tar.gz"
echo "---------"
ssh -tt -n -i ~/.ssh/covid/covid19_sos.pem ubuntu@3.6.230.117 "rm -rf /var/www/html/* && mv /var/www/html-new/* /var/www/html/"
echo "---------"

echo ""
echo ""
echo "Link: https://covidsos.org"
echo ""
echo ""
date
