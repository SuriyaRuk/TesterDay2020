#!/bin/bash
echo  "logname: ";
read logname
if [  -z "$logname" ]; then
    logname='test_oauth'
fi

echo "concurrency: ";
read concurrency
if [ -z "$concurrency" ]; then
    concurrency="1"
fi

echo "duration: ";
read duration
if [ -z "$duration" ]; then
    duration="30s"
fi

echo "timeout: ";
read teardownTimeout
if  [ -z "$teardownTimeout" ]; then
    teardownTimeout="30s"
fi


sed -i '6d'  /data/loadtest/oauth2/oauth2.js
sed -i "6i        duration: '$duration'," /data/loadtest/oauth2/oauth2.js;


sed  -i '7d' /data/loadtest/oauth2/oauth2.js;
sed  -i "7i teardownTimeout: '$teardownTimeout', " /data/loadtest/oauth2/oauth2.js;


sed  -i '5d' /data/loadtest/oauth2/oauth2.js;
sed  -i "5i vus: $concurrency, " /data/loadtest/oauth2/oauth2.js;


echo $(date) >> $logname.txt
echo "--------------------------------------------------------------start----------------------------------------------------" >> $logname.txt
docker run --rm  --net=host -v /data/loadtest/oauth2:/data loadimpact/k6 run  /data/oauth2.js | tee -a $logname.txt
echo $(date) >> $logname.txt
echo "--------------------------------------------------------------stop---------------------------------------------------" >> $logname.txt
