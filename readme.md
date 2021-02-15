Guide:
https://www.npmjs.com/package/gremlin
https://tinkerpop.apache.org/docs/current/reference/#io-step

 Pre-requisites:
docker run --name jg-cassandra -d -e CASSANDRA_START_RPC=true -p 9160:9160 -p 9042:9042 -p 7199:7199 -p 7001:7001 -p 7000:7000 cassandra:latest
docker run --name janusgraph-default -p 8182:8182 janusgraph/janusgraph
docker run --link janusgraph-default:janusgraph --link jg-cassandra:cassandradb -e GREMLIN_REMOTE_HOSTS=janusgraph -it janusgraph/janusgraph:latest ./bin/gremlin.sh

To get going:
Run "npm i"
Then:
*   To debug, run: "npm run start:dev" - this will compile and run the .ts files, also start a file watcher to recompile as changes 
    are made to any .ts files
*   To do prod build, run: "npm build" - this will clear, then create, all .js files in the /build subfolder
*   To run prod build, run: "npm run start"

Other handy commands - while debugging, if you want the app to reload, just type "rs" in the terminal, this will trigger a restart. 