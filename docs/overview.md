I am creating an iOS game. I am using firestore and expo. Below is an outline of the app. None of the overview below is final - just a concept overview for context. There may be many inconsistencies and some of the features I've already decided to abandon but the remenants of my thoughts still remain below

# App outline

## YAYO

Possible but undecided meanings:

- Yield And Yield Only
- Yield, Affluence, Yachts, Opulence
- Yoshimura Asset Yield Observatory
- Yamamoto Asset Yield Organisation

## Elevator Pitch

A sort of cross between a hedge fund simulator and trading fantasty league with a poolsuite.fm aeasthetic

## Marketing Pitch

YAYO: The Retro-Futuristic Finance Odyssey is a dynamic, community-driven stock market simulation game that merges the thrill of financial investments with the nostalgic charm of retro-futurism. Set against a backdrop that evokes the glitzy vibes of vintage finance, YAYO offers an educational yet entertaining platform where players navigate the ebbs and flows of a simulated stock market, complete with all the excitement of Wall Street’s golden era.

## Features:

- Dynamic Market Simulation: Dive into a realistic stock market environment that mirrors the volatility and opportunities of real-world financial markets, allowing for an immersive investment experience without the risk of actual money.
- Community-Driven Competitions: Form or join investment groups (Funds), participate in weekly trading competitions, and climb the leaderboards by making savvy investment choices. YAYO’s community-centric approach fosters collaboration, rivalry, and social interaction among players.
- Educational Insights: Learn the ropes of financial investment through gameplay. YAYO demystifies complex financial concepts, making it easier for players of all skill levels to understand market trends, investment strategies, and financial planning.
- Retro-Futuristic Aesthetic: Immerse yourself in a game world that combines the nostalgic feel of retro finance with futuristic elements, featuring a vibrant neon color palette, pixel-art graphics, and a synthwave soundtrack that transports players back in time.
- Membership Tiers: Choose from Standard, Executive, or Sovereign memberships, each offering different levels of access to features, tools, and exclusive perks, tailored to enhance your trading experience and strategy.

## Why Play YAYO?

- No Real Money Required: Enjoy the thrill of trading without the financial risk. TradeShark uses virtual currency, allowing players to experiment with different investment strategies and learn from their outcomes.
- Build Your Financial Acumen: Whether you’re learning the basics or honing your strategy, TradeShark offers a fun, engaging way to improve your financial literacy and decision-making skills.
- A Unique Social Experience: Connect with friends and rivals alike in a competitive yet supportive environment. Share strategies, celebrate victories, and learn from losses together.

## Core Gameplay

- **Fund Formation:** Users can create or join Pools with a maximum of 10 members. Competitions run weekly, from market opening on Monday to market close on Friday, covering NYSE and NASDAQ.
- **Weekly Picks:** Participants "invest" a virtual $100 in a single stock at the week's start. Picks are made after market close on Friday and before it reopens on Monday.
- **AUM:** that $100 increases as the Fund's "level" increases (e.g. rises to $1000 per player after $50,000 earned)
- **Earning Virtual Currency:** Users start with a base amount of virtual currency. Additional currency is awarded for winning weekly Fund challenges
- The person with the most gains sweeps all the gains and gets 2x
- Everyone else gets participation bonus to encourage enagement
- If everyone goes green everyone gets 2x
- If everyone goes red all gets 0
- The earnings are also duplicated into the fund Pot. this can be used by the Fund Manager to spend on things
- Things might be:
  - Risk Manager -> gives him the option to stop out a single player a week
  - Investor Relations -> get more AUM
  - Fund cosmetics
- **Funds levels:** unlock more weekly investment and other perks on achievement levels
  - **[Executive Members]** 2x Multiplier on winnings
  - **[Soverign Members]** 20x Multiplier on winnings
- **Virtual Bank:** Tracks currency from wins, wagers, and participation. Virtual currency can be gifted or **[Executive Members]** private investment or put in a savings account
- **Market Hours:** Targets US market hours
- **Cosmetics:** Currency can be used to by profile cosmetics.
- **Collections:** Can also have 'collections' which is just buying up to 20 different types of cars/house/watch/yatchts/jets/polititians (including local police cheif) to have in a sort of display cabinet which is purely for clout.
- **Houses:** The collections are housed in the user home which needs to be upgraded to have more items and also unlocks certain items. E.g. condo -> villa -> penthouse -> mansion -> etc.

## Fund Administration Structure

- **Roles:** Admins, acting as Fund Manager, start with one Fund admin and can invite, kick Traders (members), and assign additional admins
- **Invitation Rights:** Admins control new Trader invitations.
- **Customization:** Admins can edit the Fund's description, name, and badge.
- **Traders:** Can invest that weeks investment

## Fund Info

- **Profile:** Includes name, info, badges, banners, achievements, current week's picks and performance, member list, leaderboards, battle history, and **[Executive]** analytics on group performance.

## Additional Features

- **Social Features:** Includes friend lists, messaging, and social media sharing.
- **Achievement System:** For milestones and competitive achievements.
- **Market News Feed:** Latest financial news and analysis, includes ads.
- **Alerts System:** For market movements, winners, losers, and achievements.
- **Ranking/Level System:** Based on bank balance, with titles from Analyst to CEO.
- **[Executive]** Company info and charts page.
- **Portfolio Sharing:** For performance or trades.

## Core Mechanic with Membership Levels

- The Standard/Executive/Sovereign membership account will be associated with the Bank in the game
- **Standard Membership:** Basic access. Can start a single fund and join a single fund. Play the weekly game. Current account
- **Executive Membership:** Can start up to 5 funds and join up to 5 funds, ad removal from feed, savings account and investments
- **Sovereign Membership:** All Executive perks, plus ultra-rare cosmetics, ultra-high interest savings account, concierge service, line of credit for investments, exclusive investment funds, Soverign Vaults, access to hedge funds (bit of risk but much higher return), private investigators, (3 REDACTED PERCS - GET EXECUTIVE MEMBERSHIP TO UNLOCK)
- Executives can upgrade to Soverign for the price difference
- Hedge Fund names:
  - Aurora Capital Management
  - Cerulean Investment Partners
  - Meridian Wealth Strategies
  - Quantum Edge Investments
  - Silverpine Financial Group
  - Atlas Equity Partners
  - Peregrine Capital Holdings
  - Obsidian Asset Management
  - Luminara Investment Solutions
  - Zenith Wealth Advisory

## Membership costs

- **Executive Membership:** $4.99 a month or $34.99 for lifetime membership
- **Sovereign Membership:** $19.99 a month or $179.99 for lifetime membership ($99 upgrade for lifetime Executive members)
- Promotions and Discounts: Introductory offers, discounts for annual subscriptions, or special pricing for lifetime membership on special events such as the tax year
- Cancel any time

## Leaderboards and Progress Tracking

- Tracks weekly winners, overall gains, longest win streaks, and showcases significant achievements in a Hall of Fame.

## Monetization Strategy

- **Freemium Model:** Basic access is free, with in-app purchases for extra virtual currency and cosmetics.
- **Executive/Sovereign Membership:** Enhanced features and services.

## Virality

- **Referral Bonuses:** For successful referrals both get lots of virtual currency and also items (like a nice watch)
- **Referral Bonuses:** For 100 successful referals the referer gets life Executive membership
- **Exclusive Cosmetics for Referrers:** Unique avatars, badges, or themes.
- **Referral Leaderboards:** Reward top referrers.

## Retention

- **Daily Login Rewards:** To encourage regular engagement.
- **Milestones/Achievements:** With increasing difficulty.
- **Weekly Events:** Like double rewards or interest rates.

## Aesthetic Mood Board

- Inspired by PoolSuite, Gordon Gecko, Amex, and Vaporwave aesthetics.
- YAYO marketing. WEALTH SIMULATOR
- Legal department answer the moral questions

## Technical and Gameplay Considerations

- Integration with real-time stock market data
- mobile-only access and probably only iphone
- analytics
- feedback mechanisms
- firebase/custom/CloudKit?
- React native with expo

## Stretch Goals

- **In-App Messaging and Chat Rooms**, **Integration with External Social Media**, **User-Generated Content**, **Seamless Onboarding Experience**, and feedback mechanisms.

## YAYO Game Firestore Data Model

The data model below is not perfectly accurate nor does it perfectly align with some of the overview above. it's a rough work in progress and already partially stale - just a reference.

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
