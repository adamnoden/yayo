## YAYO Game Firestore Data Model

### `Users` Collection

Stores individual user profiles, including financial and social details.

- **User Document** (`uid`)
  - `username`: String
  - `email`: String?
  - `number`: String?
  - `balance`: Number (Virtual currency balance)
  - `membershipLevel`: String ("Standard", "Executive", "Sovereign")
  - `purchases`: Subcollection
    - **Purchase Document** (`purchaseID`)
      - `itemType`: String ("Watch", "Yacht", etc.)
      - `itemName`: String
      - `purchaseDate`: Timestamp
      - `cost`: Number
  - `achievements`: Subcollection
    - **Achievement Document** (`achievementID`)
      - `title`: String
      - `dateAchieved`: Timestamp
      - `details`: String

## `Friends`s Collection (`user_friends`)

Each document in this collection represents a friendship link between two users.

- **Friendship Document** (`friendshipID`)
  - `userUid`: String (UID of the user)
  - `friendUid`: String (UID of the friend)
  - `status`: String ("pending", "accepted", "blocked")
  - `created`: Timestamp (When the friendship was initiated)
  - `accepted`: Timestamp? (When the friendship was accepted, if applicable)

### `Funds` Collection

Details of each investment fund, including members and fund-specific activities.

- **Fund Document** (`fundID`)
  - `name`: String
  - `description`: String
  - `adminUid`: String (The `uid` of the fund's admin)
  - `memberUids`: Array of Strings (Each string is a `uid` of a fund member)
  - `banner`: String (URL)
  - `performanceStats`: Object
    - `totalGainsLosses`: Number (Overall profit or loss the fund has generated)
    - `weeklyPerformance`: Object
      - `currentWeekGainLoss`: Number
      - `previousWeekGainLoss`: Number
    - `winLossRatio`: Object
      - `wins`: Number
      - `losses`: Number
    - `bestPerformance`: Object
      - `bestWeekGain`: Number
      - `date`: Timestamp
    - `worstPerformance`: Object
      - `worstWeekLoss`: Number
      - `date`: Timestamp
    - `averageWeeklyReturn`: Number
    - `mostProfitableInvestments`: Array of Objects
      - `stockSymbol`: String
      - `investedAmount`: Number
      - `return`: Number
  - `memberLeaderboard`: Array of Objects
    - `uid`: String (The `uid` of the member)
    - `totalGainsLosses`: Number (Member’s overall performance)
    - `weeklyGainLoss`: Number (Derived from the most recent "CapitalAllocation" document)
  - `capitalAllocations`: Subcollection (Weekly strategic investment allocations by fund members)
    - **Capital Allocation Document** (`capitalAllocationID`)
      - `stockSymbol`: String
      - `investedAmount`: Number
      - `result`: String ("Pending", "Win", "Lose")
  - `transactions`: Subcollection (Tracks financial activities specific to the fund)
    - **Transaction Document** (`transactionID`)
      - `uid`: String (The `uid` of the user involved in the transaction)
      - `type`: String ("Dividend", "Investment", "Purchase", "Penalty", "Withdrawal")
      - `amount`: Number
      - `date`: Timestamp
      - `details`: String

### `CapitalAllocations` Global Collection

Tracks all strategic investment allocations across the platform.

- **Capital Allocation Document** (`capitalAllocationID`)
  - `uid`: String (The `uid` of the user who made the allocation)
  - `stockSymbol`: String (The symbol of the stock being invested in)
  - `shares`: Number (The number of shares purchased)
  - `buyPrice`: Number (The price per share at the time of purchase)
  - `buyTimestamp`: Timestamp (For identifying competition weeks)
  - `sellPrice`: Number? (The price per share at the time of sale)
  - `sellTimestamp`: Timestamp? (For identifying competition weeks)

### `Messages` Collection (Optional for Direct Messaging)

Stores messages between users or within funds.

- **Message Document** (`messageID`)
  - `fromUid`: String (The `uid` of the sender)
  - `toUid`: String (The `uid` of the recipient, optional for direct messages)
  - `message`: String
  - `timestamp`: Timestamp

### `Transactions` Global Collection

A global log of all transactions for audit and analysis.

- **Transaction Document** (`transactionID`)
  - `uid`: String (The `uid` of the user involved in the transaction)
  - `type`: String ("Investment", "Reward", "Purchase")
  - `amount`: Number
  - `date`: Timestamp
  - `details`: String

### `Achievements` Global Collection

Catalogue of achievements that users can unlock.

- **Achievement Document** (`achievementID`)
  - `title`: String
  - `description`: String
  - `icon`: String (URL)
