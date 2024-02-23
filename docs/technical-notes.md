## Data fetching

- caching as a way to 'schedule' date updates
- invalidate the data for how often you want to 'schedule' an update
- only first user gets the full passthrough

- 12,202 tradable names listed on the NYSE and NASDAQ (7,754 and 4,448)
- Finhubb 60 API calls/minute free

## Caching

- Firestore can be used for caching
- Firestore Reads: The first 50,000 reads per day are free, then $0.06 per 100,000 reads.
- Firestore Writes: The first 20,000 writes per day are free, then $0.18 per 100,000 writes.

### Apple

102231882510

## Firestore tests

curl -X POST \
 -H "Content-Type: application/json" \
 --data '{"data": {"ticker":"AAPL"}}' \
 http://localhost:5001/yayo-backend/us-central1/fetchStockPrice

firebase emulators:start
