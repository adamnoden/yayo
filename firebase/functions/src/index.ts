import * as admin from "firebase-admin";

admin.initializeApp();

export { fetchStockPrice } from "./functions/fetchStockPrice";
export { addStockPick } from "./functions/addStockPick";
export { sellStockPick } from "./functions/sellStockPick";
export { getLatestUserPick } from "./functions/getLatestUserPick";
export { getUserAccountBalance } from "./functions/getUserAccountBalance";
