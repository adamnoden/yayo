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
            "pickId": "JCRkYvt6rrtNlpezp79R",
            "userId": "foobar",
            "sellPrice": 190.02
          }
        }' \
     http://localhost:5001/yayo-backend/us-central1/sellStockPick

curl -X POST -H "Content-Type:application/json" \
     -d '{
          "data": {
            "pickId": "abc123",
            "userId": "foobar",
            "sellPrice": 150.00
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
