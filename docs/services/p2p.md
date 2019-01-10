# P2P Service

The p2p service provides a peer-to-peer interface for the NPW blockchain. This service abstracts the connection and commnuication interface between the NPW and the rest of npwcore node.


This service also provides the publisher interface on npwcore-node bus architecture. The P2P service will publish header, block and transaction events.

## Service Configuration

```json
"p2p": {
  "peers": [
  { "ip": { "v4": "127.0.0.1" }, "port": 8333 }
  ]
}
```

## Other services this service Depends on

None
