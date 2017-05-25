# nodejs-async-await-wrapper-example
##
NodeJS async-await wrapper example
==================================

This is a simple example of how to use wrappers to leverage async-await with callback based libraries. MySQL was used for this example.

- This project requires a version of NodeJS with support for async-await

Getting Started
---------------

```sh
# clone the project
git clone git@github.com:YuLeven/nodejs-async-await-wrapper-example.git
cd nodejs-async-await-wrapper-example

# Install dependencies
npm install

# Run the server
PORT=8080 MYSQL_DB_USER=root MYSQL_DB_NAME=exapp MYSQL_DB_PASSWORD=secret MYSQL_DB_ADDRESS=localhost MYSQL_DB_POOL_SIZE=10 npm start

License
-------

MIT