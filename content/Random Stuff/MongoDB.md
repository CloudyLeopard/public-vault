MongoDB

Order:
Cluster -> Database -> Collection

# PyMongo

PyMongo accepts python to straight up give it an `uuid` object, and if fetched it will also return an `uuid` object rather than a string. `uuid` objects could even be used in a query.
However, must configure it when initializing PyMongo Client
```python
client = MongoClient(uuidRepresentation='standard')
```

## Debugging
I got an error about `Cannot import SON from BSON` or something like that, and its basically mismatching version for BSON that is required by PyMongo.

We can force to download the most recent version by doing something like
- `pymongo==4.10.0`, `bson==0.5.101` in the `pyproject.toml` or `requirements.txt` file
- or just force download most recent version (specify the version)

# Motor DB (Async PyMongo)

**Issue:** Getting a "Task attached to a different loop run time error".
**Solution**: https://github.com/fastapi/fastapi/issues/3855#issuecomment-1013148113

I think the problem is that maybe the async motor client is attached to the global event loop (or some bs like that), and so *supposedly* if i initialized the client at the app startup (e.g. if i use fastapi intialize it at startup) then it should be ok.

An easier solution is the solution suggested in the thread linked above.


# MongoDB (Atlas)
Create free cluster on MongoDB

> [!Important] Network Access
> Unless the cluster network access is set to "open to all", only specific IP addresses can access the cluster. So, if I get an error on this in the future, just add the IP address or temporarily make it so that every ip address can access atlas.


# Hosting on Local Machine (Community V.)
> [!important] Guide
> See [mongodb community version](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install-mdb-community-macos) for full instruction

## Starting and Stopping

To run MongoDB (i.e. the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) process) **as a macOS service**, run:
```bash
brew services start mongodb-community@8.0
```

To stop a [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) running as a macOS service, use the following command as needed:
```bash
brew services stop mongodb-community@8.0
```

To run [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) **manually as a background process** using a config file, run:
```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

To run `mongod` **manually as a background process** specifying [`--dbpath`](https://www.mongodb.com/docs/manual/reference/program/mongod/#std-option-mongod.--dbpath) and [`--logpath`](https://www.mongodb.com/docs/manual/reference/program/mongod/#std-option-mongod.--logpath) on the command line, run:
```bash
mongod --dbpath /path/to/dbdir --logpath /path/to/mongodb.log --fork
```

To stop a [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) running as a background process, connect to the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) using [mongosh](https://www.mongodb.com/docs/mongodb-shell/), and issue the [`shutdown`](https://www.mongodb.com/docs/manual/reference/command/shutdown/#mongodb-dbcommand-dbcmd.shutdown) command as needed.

## Monitoring Status
To verify that MongoDB is running, perform one of the following:
If you started MongoDB **as a macOS service**:
```bash
brew services list
```
*You should see the service `mongodb-community` listed as `started`.*

If you started MongoDB **manually as a background process**:
```bash
ps aux | grep -v grep | grep mongod
```
*You should see your `mongod` process in the output.*


## Connecting to MongoDB
To begin using MongoDB, connect [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) to the running instance. From a new terminal, issue the following:
```bash
mongosh "<uri>"
```

# Mongosh
[MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)
Terminal for interacting with cluster

Show list of databses:
```bash
show dbs
```

Connect to a database
```bash
use <database>
```

Show collections
```bash
show collections
```