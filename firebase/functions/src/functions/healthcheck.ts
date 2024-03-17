import * as functions from "firebase-functions";

export const healthcheck = functions.https.onRequest((_request, response) => {
  response
    .status(200)
    .send({ status: "success", message: "Function is alive" });
});
