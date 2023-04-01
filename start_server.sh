#!/bin/sh

TOKEN=$(curl --max-time 3 -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600") 
AZ_VAL=$(curl --max-time 3 -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/placement/availability-zone)
INSTANCE_ID=$(curl --max-time 3 -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/instance-id)

if [ "$AZ_VAL" = "" ]; then 
    echo "It seems you are running NodeJs on non EC2 server."
    AZ_VAL="No AZ. NodeJs running on non EC2 server"
    INSTANCE_ID="No INSTANCE_ID. NodeJs running on non EC2 server"
fi

export AZ_VAL=$AZ_VAL
export INSTANCE_ID=$INSTANCE_ID

NODE_VERSION=$(node --version)

if [ "$NODE_VERSION" = "" ]; then 
    echo "Installing Node.js"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    . ~/.nvm/nvm.sh
    nvm install 16
fi

npm install
node app.js
