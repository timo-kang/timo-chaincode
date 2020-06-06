#!/bin/bash
CHAINCODE_VERSION=1.4
CLI_CONTAINER_NAME=cli-goono

docker exec $CLI_CONTAINER_NAME ./cli-chaincode-upgrade.sh $CHAINCODE_VERSION