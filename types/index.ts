/**
 * Types shared between front and back end
 */

export enum MembershipLevel {
  Standard = "Standard",
  Executive = "Executive",
  Sovereign = "Sovereign",
}

// Users.ts
export interface UserData {
  username: string;
  balance: number;
  membershipLevel: MembershipLevel;
  email?: string;
  number?: string;
  purchases?: Purchase[];
  achievements?: Achievement[];
}

export interface Purchase {
  purchaseID: string;
  itemType: string;
  itemName: string;
  purchaseDate: Date;
  cost: number;
}

export interface Achievement {
  achievementID: string;
  title: string;
  dateAchieved: Date;
  details: string;
}

export interface Friendship {
  friendshipID: string;
  userUid: string;
  friendUid: string;
  status: "pending" | "accepted" | "blocked";
  created: Date;
  accepted?: Date;
}

// backend fund interface
export interface FundData {
  name: string;
  level: number;
  adminUid: string;
  memberUids: string[];
  // banner: string;
  createdAt: any; // stored as `FirebaseFirestore.Timestamp` - on front end convert to `Date` with `toDate()`
  performanceStats?: FundPerformanceStats;
  memberLeaderboard?: MemberLeaderboardEntry[]; // not sure if final structure
  capitalAllocations?: CapitalAllocation[]; // not sure if final structure - rethink
  transactions?: Transaction[];
}

// frontend fund interface
export interface Fund extends FundData {
  id: string;
  createdAt: Date;
}

export interface FundPerformanceStats {
  totalGainsLosses: number;
  weeklyPerformance: WeeklyPerformance;
  winLossRatio: WinLossRatio;
  bestPerformance: PerformanceEntry;
  worstPerformance: PerformanceEntry;
  averageWeeklyReturn: number;
  mostProfitableInvestments: ProfitableInvestment[];
}

export interface WeeklyPerformance {
  currentWeekGainLoss: number;
  previousWeekGainLoss: number;
}

export interface WinLossRatio {
  wins: number;
  losses: number;
}

export interface PerformanceEntry {
  amount: number;
  date: Date;
}

export interface ProfitableInvestment {
  stockSymbol: string;
  investedAmount: number;
  return: number;
}

export interface MemberLeaderboardEntry {
  uid: string;
  totalGainsLosses: number;
  weeklyGainLoss: number;
}

// TODO: think about this structure
export interface CapitalAllocation {
  capitalAllocationID: string;
  stockSymbol: string;
  sharesBought: number;
}

export interface Transaction {
  transactionID: string;
  uid: string;
  type: "Dividend" | "Investment" | "Purchase" | "Penalty" | "Withdrawal";
  amount: number;
  date: Date;
  details: string;
}

export interface CapitalAllocationDocument {
  capitalAllocationID: string;
  uid: string;
  stockSymbol: string;
  shares: number;
  buyPrice: number;
  buyTimestamp: Date;
  sellPrice?: number;
  sellTimestamp?: Date;
}

// Messages.ts
export interface Message {
  messageID: string;
  fromUid: string;
  toUid?: string;
  message: string;
  timestamp: Date;
}

// Transactions.ts
export interface GlobalTransaction {
  transactionID: string;
  uid: string;
  type: "Investment" | "Reward" | "Purchase";
  amount: number;
  date: Date;
  details: string;
}

// Achievements.ts
export interface GlobalAchievement {
  achievementID: string;
  title: string;
  description: string;
  icon: string;
}
