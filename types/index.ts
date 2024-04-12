/**
 * Types shared between front and back end
 */

export enum MembershipLevel {
  Standard = "Standard",
  Executive = "Executive",
  Sovereign = "Sovereign",
}

// Users.ts
export interface User {
  uid: string;
  username: string;
  email?: string;
  number?: string;
  balance: number;
  membershipLevel: MembershipLevel;
  purchases: Purchase[];
  achievements: Achievement[];
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

// Friends.ts
export interface Friendship {
  friendshipID: string;
  userUid: string;
  friendUid: string;
  status: "pending" | "accepted" | "blocked";
  created: Date;
  accepted?: Date;
}

// Funds.ts
export interface Fund {
  fundID: string;
  name: string;
  fundLevel: number;
  adminUid: string;
  memberUids: string[];
  banner: string;
  performanceStats: FundPerformanceStats;
  memberLeaderboard: MemberLeaderboardEntry[];
  capitalAllocations: CapitalAllocation[];
  transactions: Transaction[];
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

export interface CapitalAllocation {
  capitalAllocationID: string;
  stockSymbol: string;
  investedAmount: number;
  result: "Pending" | "Win" | "Lose";
}

export interface Transaction {
  transactionID: string;
  uid: string;
  type: "Dividend" | "Investment" | "Purchase" | "Penalty" | "Withdrawal";
  amount: number;
  date: Date;
  details: string;
}

// CapitalAllocations.ts
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
