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
