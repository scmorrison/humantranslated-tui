#!/bin/sh
# basic_login.sh

USERNAME=$1
PASSWORD=$2

rm .jarfile
echo --- login
curl --cookie-jar .jarfile --data "username=$USERNAME&password=$PASSWORD" http://localhost:3000/api/auth/signin
echo --- test
curl --cookie .jarfile "http://localhost:3000/api/stories"
