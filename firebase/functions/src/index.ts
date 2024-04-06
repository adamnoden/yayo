import * as admin from "firebase-admin";

admin.initializeApp();

// export { addStockPick } from "./functions/addStockPick";
// export { sellStockPick } from "./functions/sellStockPick";
// export { getLatestUserPick } from "./functions/getLatestUserPick";
// export { getUserAccountBalance } from "./functions/getUserAccountBalance";

export { healthcheck } from "./functions/healthcheck";
export { fetchStockPrice } from "./functions/fetchStockPrice";
export { createUserDocument } from "./functions/createUser";
export { createFund } from "./functions/createFund";
