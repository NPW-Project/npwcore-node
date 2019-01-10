# Fee Service

The fee service is a requirement of the insight-api service (not a npwcore-node built-in service). Its primary purpose is to query a npw full node for the most up-to-date miner fees for transactions. A npw full node such as [NewPowerCoin](https://github.com/npw-project/newpowercoin) with an available RPC interface is required.

## Service Configuration

```json
"fee": {
  "rpc": {
    "user": "user",
      "pass": "pass",
      "host": "localhost",
      "protocol": "http",
      "port": 61473
  }
}
```
## Usage Example

```bash
curl http://localhost:3001/insight-api/estimateFee
```
