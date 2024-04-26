import * as admin from "firebase-admin";

admin.initializeApp();

export { healthcheck } from "./functions/healthcheck";
export { fetchStockPrice } from "./functions/fetchStockPrice";
export { createUserDocument } from "./functions/createUser";
export { createFund } from "./functions/createFund";
export { addCapitalAllocation } from "./functions/addCapitalAllocation";
