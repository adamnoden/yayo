### start emulators

`npm run serve`

### get user pick

```
curl -X POST -H "Content-Type:application/json" \
  -d '{
        "data": {
          "userId": "foobar"
        }
      }' \
  http://localhost:5001/yayo-backend/us-central1/getLatestUserPick
```

### add stock pick

```
curl -X POST -H "Content-Type:application/json" \
  -d '{
        "data": {
          "userId": "foobar",
          "ticker": "TEST",
          "shares": 0.5857,
          "buyPrice": 170.73,
          "lastFetchedPrice": 173.24
        }
      }' \
  http://localhost:5001/yayo-backend/us-central1/addStockPick
```

### fetch stock price

```
curl -X POST \
 -H "Content-Type: application/json" \
 --data '{"data": {"ticker":"NVDA"}}' \
 http://localhost:5001/yayo-backend/us-central1/fetchStockPrice

curl -X POST \
 -H "Content-Type: application/json" \
 --data '{"data": {"ticker":"NVDA"}}' \
https://us-central1-yayo-backend.cloudfunctions.net/fetchStockPrice
```
