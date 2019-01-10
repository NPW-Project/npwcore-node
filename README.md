NPW Node
============

A NewPowerCoin blockchain indexing and query service. Intended to be used with as a NewPowerCoin full node or in conjunction with a NewPowerCoin full node.

## Upgrading from previous versions of NPW Node

There is no upgrade path from previous versions of NPW Node due to the removal of the included NPW Core software. By installing this version, you must resynchronize the indexes from scratch.

## Install

```bash
npm install
./bin/npwcore-node start
```

Note: A default configuration file is placed in the npwcore user's home directory (~/.npwcore/npwcore-node.json). Or, alternatively, you can copy the provided "npwcore-node.json.sample" file to the project's root directory as npwcore-node.json and edit it for your preferences.

## Prerequisites

- Node.js v8.2.0+
- ~500GB of disk storage
- ~4GB of RAM

## Configuration

The main configuration file is called "npwcore-node.json". This file instructs npwcore-node for the following options:

- location of database files (datadir)
- tcp port for web services, if configured (port)
- npw network type (e.g. mainnet, testnet, regtest), (network)
- what services to include (services)
- the services' configuration (servicesConfig)

## Add-on Services

There are several add-on services available to extend the functionality of NPW:

- [Insight API](https://github.com/npw-project/insight-api)
- [Insight UI](https://github.com/npw-project/insight-ui)
- [NPW Wallet Service](https://github.com/npw-project/npwcore-wallet-service)

## Documentation

- [Services](docs/services.md)
  - [Fee](docs/services/fee.md) - Creates a service to handle fee queries
  - [Header](docs/services/header.md) - Creates a service to handle block headers
  - [Block](docs/services/block.md) - Creates a service to handle blocks
  - [Transaction](docs/services/transaction.md) - Creates a service to handle transactions
  - [Address](docs/services/address.md) - Creates a service to handle addresses
  - [Mempool](docs/services/mempool.md) - Creates a service to handle mempool
  - [Timestamp](docs/services/timestamp.md) - Creates a service to handle timestamp
  - [Db](docs/services/db.md) - Creates a service to handle the database
  - [p2p](docs/services/p2p.md) - Creates a service to handle the peer-to-peer network
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/npw-project/npwcore-lib/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/npw-project/npwcore-node/blob/master/LICENSE).

Copyright 2018 NewPowerCoin, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
- bitpay: Copyright (c) 2013-2017 BitPay, Inc. (MIT License)
