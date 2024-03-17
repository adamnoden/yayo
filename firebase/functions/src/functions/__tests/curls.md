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

curl -X POST -H "Content-Type:application/json" \
  -d '{
        "data": {
          "userId": "foobar"
        }
      }' \
  https://us-central1-yayo-backend.cloudfunctions.net/getLatestUserPick
```

### add stock pick

```
curl -X POST -H "Content-Type:application/json" \
  -d '{
        "data": {
          "userId": "foobar",
          "ticker": "TEST",
          "shares": 0.5857,
          "buyPrice": 170.73
        }
      }' \
  http://localhost:5001/yayo-backend/us-central1/addStockPick

curl -X POST -H "Content-Type:application/json" \
     -d '{
           "data": {
             "userId": "foobar",
             "ticker": "TEST",
             "shares": 10,
             "buyPrice": 100.50
           }
         }' \
     https://us-central1-yayo-backend.cloudfunctions.net/addStockPick

```

### sell stock pick

```

curl -X POST -H "Content-Type:application/json" \
     -d '{
          "data": {
            "pickId": "p0CsdLWFkJ2yJg8i7Wpa",
            "userId": "foobar",
            "sellPrice": 190.02
          }
        }' \
     http://localhost:5001/yayo-backend/us-central1/sellStockPick

curl -X POST -H "Content-Type:application/json" \
     -d '{
          "data": {
            "pickId": "2zq5HVih3FgMUXCkhKbX",
            "userId": "foobar",
            "sellPrice": 190.00
          }
        }' \
     https://us-central1-yayo-backend.cloudfunctions.net/sellStockPick
```

### fetch stock price

```
curl -X POST \
 -H "Content-Type: application/json" \
 --data '{"data": {"ticker":"NVDA"}}' \
 http://localhost:5001/yayo-backend/us-central1/fetchStockPrice

curl -X POST \
 -H "Content-Type: application/json" \
 --data '{"data": {"ticker":"TEST"}}' \
 http://localhost:5001/yayo-backend/us-central1/fetchStockPrice

curl -X POST \
 -H "Content-Type: application/json" \
 --data '{"data": {"ticker":"NVDA"}}' \
https://us-central1-yayo-backend.cloudfunctions.net/fetchStockPrice
```

### fetch user balance

```
curl -X POST -H "Content-Type:application/json" \
     -d '{"data": {"userId": "foobar"}}' \
     http://localhost:5001/yayo-backend/us-central1/getUserAccountBalance

curl -X POST -H "Content-Type:application/json" \
     -d '{"data": {"userId": "foobar"}}' \
     https://us-central1-yayo-backend.cloudfunctions.net/getUserAccountBalance
```
