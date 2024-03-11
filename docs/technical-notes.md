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

## Firebase stuff

// add env config
firebase functions:config:set finnhub.api_key="your_finnhub_api_key_here"

// Fetch the current environment config to your local machine if you haven't already or if there are updates:
firebase functions:config:get > .runtimeconfig.json
// then move file into functions folder
// can also directly just update it as long as it matches the path above

firebase deploy --only functions

// update local indexes with whats in the project
firebase firestore:indexes > firestore.indexes.json

### Polygon.io

Github login

https://polygon.io/dashboard

https://polygon.io/docs/stocks/get_v3_reference_tickers
https://polygon.io/docs/stocks/get_v2_last_trade__stocksticker
