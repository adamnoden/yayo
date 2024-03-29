## YAYO Game Firestore Data Model

### `Users` Collection

Stores individual user profiles, including financial and social details.

- **User Document** (`uid`)
  - `username`: String
  - `email`: String
  - `balance`: Number (Virtual currency balance)
  - `membershipLevel`: String ("Standard", "Executive", "Sovereign")
  - `friendUids`: Array of Strings (Each string is a `uid` of a friend)
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

### `Funds` Collection

Details of each investment fund, including members and fund-specific activities.

- **Fund Document** (`fundID`)
  - `name`: String
  - `description`: String
  - `adminUid`: String (The `uid` of the fund's admin)
  - `memberUids`: Array of Strings (Each string is a `uid` of a fund member)
  - `banner`: String (URL)
  - `capitalAllocations`: Subcollection (Weekly strategic investment allocations by fund members)
    - **Capital Allocation Document** (`capitalAllocationID`)
      - `stockSymbol`: String
      - `investedAmount`: Number
      - `result`: String ("Pending", "Win", "Lose")

### `CapitalAllocations` Global Collection

Tracks all strategic investment allocations across the platform.

- **Capital Allocation Document** (`capitalAllocationID`)
  - `uid`: String (The `uid` of the user who made the allocation)
  - `fundID`: Reference to Fund Document
  - `stockSymbol`: String
  - `investedAmount`: Number
  - `result`: String ("Pending", "Win", "Lose")
  - `week`: Timestamp (For identifying competition weeks)

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
