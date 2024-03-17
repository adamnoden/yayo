const axios = require("axios");
const {
  logSuccess,
  logError,
  checkEmulatorRunning,
  logAllTestsPassed,
} = require("./utils");
const { BASE_URL } = require("./config");

const random3DigitInt = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
const testTicker = `YAYO-TEST-TICKER-${random3DigitInt}`;
const testUser = `YAYO-TEST-USER-${random3DigitInt}`;

async function runTests() {
  const emulatorRunning = await checkEmulatorRunning();
  if (!emulatorRunning) return;

  let pickId = null;

  // get latest pick when it doesnt exist
  try {
    const res = await axios.post(`${BASE_URL}/getLatestUserPick`, {
      data: {
        userId: testUser,
      },
    });
    if (res.data.result.success === false) {
      logSuccess(`Successfuly fetched no pick for user`);
    } else {
      logFailure("Fetched an imaginary pick?");
    }
  } catch (error) {
    logError(
      `Error during 'getLatestUserPick' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  // add a pick
  try {
    const addResponse = await axios.post(`${BASE_URL}/addStockPick`, {
      data: {
        userId: testUser,
        ticker: testTicker,
        shares: 10,
        buyPrice: 100.5,
      },
    });
    pickId = addResponse.data.result.id;
    logSuccess(`Added stock pick with ID: ${pickId}`);
  } catch (error) {
    logError(
      `Error during 'addStockPick' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  // get latest pick when one does exist
  try {
    const res = await axios.post(`${BASE_URL}/getLatestUserPick`, {
      data: {
        userId: testUser,
      },
    });
    if (res.data.result.success === true && res.data.result.pickId === pickId) {
      logSuccess(`Successfuly fetched pick for user`);
    } else {
      logFailure("Something wrong with pick fetch");
    }
  } catch (error) {
    logError(
      `Error during 'getLatestUserPick' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  // sell it
  try {
    const sellResponse = await axios.post(`${BASE_URL}/sellStockPick`, {
      data: { pickId, userId: testUser, sellPrice: 190.0 },
    });
    logSuccess(`${sellResponse.data.result.message}`);
  } catch (error) {
    logError(
      `Error during 'sellStockPick' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  // get latest pick when the last one was sold
  try {
    const res = await axios.post(`${BASE_URL}/getLatestUserPick`, {
      data: {
        userId: testUser,
      },
    });
    if (res.data.result.success === false) {
      logSuccess(`Successfuly fetched no pick for user`);
    } else {
      logFailure("Shouldnt have returned anything");
    }
  } catch (error) {
    logError(
      `Error during 'getLatestUserPick' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  // get account balance
  try {
    const balanceResponse = await axios.post(
      `${BASE_URL}/getUserAccountBalance`,
      {
        data: { userId: testUser },
      }
    );
    logSuccess(`User account balance fetched`);

    const balance = balanceResponse.data.result.balance;
    if (balance === 895) {
      logSuccess(`User account balance was correct: $${balance}`);
    } else {
      logError(`User account balance was incorrect: $${balance}`);
      return;
    }
  } catch (error) {
    logError(
      `Error during 'getUserAccountBalance' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  // get price no cache
  try {
    const priceResponse = await axios.post(`${BASE_URL}/fetchStockPrice`, {
      data: { ticker: testTicker },
    });
    const { price, source } = priceResponse.data.result;
    if (price !== 101) {
      logError("Stock price fetch incorrect price:", price);
      return;
    }
    if (source !== "api") {
      logError("Stock price fetch incorrect source:", source);
      return;
    }
    logSuccess(`Stock price fetch success`);
  } catch (error) {
    logError(
      `Error during 'fetchStockPrice' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  // get price with cache
  try {
    const priceResponse = await axios.post(`${BASE_URL}/fetchStockPrice`, {
      data: { ticker: testTicker },
    });
    const { price, source } = priceResponse.data.result;
    if (price !== 101) {
      logError("Stock price fetch incorrect price:", price);
      return;
    }
    if (source !== "cache") {
      logError("Stock price fetch incorrect source:", source);
      return;
    }
    logSuccess(`Stock price fetch from cache success`);
  } catch (error) {
    logError(
      `Error during 'fetchStockPrice' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  logAllTestsPassed(`All tests pass`);
}

runTests();
