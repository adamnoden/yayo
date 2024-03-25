enum MarketClosureReason {
  Holiday = "Holiday",
  Weekend = "Weekend",
  OutOfMarketHours = "Out of market hours",
}
export interface MarketStatus {
  isOpen: boolean;
  reason: MarketClosureReason | null; // null when market open
  timeUntilNextOpenOrClose: string;
}
/**
 * Checks if the NYSE/NASDAQ market is open, considering weekdays, DST adjustments for Eastern Time, and a simplified version of U.S. holidays.
 * Returns the status, including a reason if it is closed and time until next open or close
 */
export function getMarketStatus(): MarketStatus {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Check if today is a holiday
  const isHoliday = isUSHoliday(now);

  if (isHoliday) {
    return {
      isOpen: false,
      reason: MarketClosureReason.Holiday,
      timeUntilNextOpenOrClose: calculateTimeUntilNextOpenOrClose(now, false),
    };
  }

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      isOpen: false,
      reason: MarketClosureReason.Weekend,
      timeUntilNextOpenOrClose: calculateTimeUntilNextOpenOrClose(now, false),
    };
  }

  // Check for market hours, adjusting for user's local timezone to ET
  if (!isWithinMarketHours()) {
    return {
      isOpen: false,
      reason: MarketClosureReason.OutOfMarketHours,
      timeUntilNextOpenOrClose: calculateTimeUntilNextOpenOrClose(now, false),
    };
  }

  return {
    isOpen: true,
    reason: null,
    timeUntilNextOpenOrClose: calculateTimeUntilNextOpenOrClose(now, true),
  };
}

// Function to calculate U.S. holidays
function getUSHolidays(year: number): Date[] {
  return [
    new Date(year, 0, 1), // New Year's Day
    new Date(year, 0, thirdMonday(year, 0)), // Martin Luther King Jr. Day
    new Date(year, 1, thirdMonday(year, 1)), // Presidents’ Day
    calculateGoodFriday(year), // Good Friday
    new Date(year, 4, lastMonday(year, 4) + 1), // Memorial Day
    new Date(year, 5, 19), // Juneteenth
    new Date(year, 6, 4), // Independence Day
    new Date(year, 8, firstMonday(year, 8)), // Labor Day
    new Date(year, 10, fourthThursday(year, 10)), // Thanksgiving Day
    new Date(year, 11, 25), // Christmas Day
  ];
}

// Function to check if the current time is within market hours
function isWithinMarketHours(): boolean {
  const now = new Date();
  const utcHour = now.getUTCHours();

  // Determine if current date is within DST for the U.S. (Eastern Time)
  // DST starts on the second Sunday in March and ends on the first Sunday in November.
  const startDST = new Date(
    now.getFullYear(),
    2,
    14 - (new Date(now.getFullYear(), 2, 1).getDay() || 7)
  );
  const endDST = new Date(
    now.getFullYear(),
    10,
    7 - (new Date(now.getFullYear(), 10, 1).getDay() || 7)
  );

  // Adjust for Eastern Time, considering DST
  const etHour = isDST(now) ? utcHour - 4 : utcHour - 5;

  // Market hours are from 9:30 AM to 4:00 PM ET
  const isOpen = etHour >= 9.5 && etHour < 16;

  return isOpen;
}

// Function to calculate Good Friday based on Easter Sunday
function calculateGoodFriday(year: number): Date {
  // Calculate Easter Sunday (using the Computus algorithm or similar)
  const easter = calculateEaster(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2); // Good Friday is 2 days before Easter
  return goodFriday;
}

/**
 * This algorithm computes the date of Easter Sunday for any given year in the Gregorian calendar system.
 *  It works by calculating a series of intermediate values that, when combined, yield the month and day of Easter.
 */
function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day); // JavaScript months are 0-indexed
}

// Helpers for holiday calculations
function thirdMonday(year: number, month: number): number {
  return nthWeekdayOfMonth(year, month, 1, 3);
}

function firstMonday(year: number, month: number): number {
  return nthWeekdayOfMonth(year, month, 1, 1);
}

function fourthThursday(year: number, month: number): number {
  return nthWeekdayOfMonth(year, month, 4, 4);
}

function nthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  nth: number
): number {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const offset = (7 + weekday - firstDayOfMonth) % 7;
  return 1 + offset + (nth - 1) * 7;
}

function lastMonday(year: number, month: number): number {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const dayOfWeek = lastDayOfMonth.getDay();
  return lastDayOfMonth.getDate() - ((dayOfWeek + 6) % 7);
}

// Determine if the current date is in DST
function isDST(date: Date): boolean {
  const year = date.getFullYear();
  // DST starts on the second Sunday in March
  const dstStart = new Date(year, 2, 14 - (new Date(year, 2, 1).getDay() || 7));
  // DST ends on the first Sunday in November
  const dstEnd = new Date(year, 10, 7 - (new Date(year, 10, 1).getDay() || 7));

  // Compare current date to DST start and end
  return date >= dstStart && date < dstEnd;
}

function calculateTimeUntilNextOpenOrClose(now: Date, isOpen: boolean): string {
  let targetTime: Date;

  if (isOpen) {
    // Calculate time until market close
    const closeTime = new Date(now);
    closeTime.setHours(16, 0, 0, 0); // Market closes at 4:00 PM ET
    targetTime = closeTime;
  } else {
    // Calculate time until market open
    // This part is more complex because you have to consider the next day the market is open (could be next weekday or after a holiday)
    targetTime = calculateNextMarketOpenTime(now);
  }

  // Calculate the difference in milliseconds
  const diff = targetTime.getTime() - now.getTime();

  // Convert milliseconds to a more human-readable form (e.g., hours, minutes)
  return formatTimeDiff(diff);
}

function calculateNextMarketOpenTime(now: Date): Date {
  let nextOpen = new Date(now);
  nextOpen.setHours(9, 30, 0, 0); // Set to 9:30 AM ET

  // If it's past 9:30 AM ET, move to the next day
  if (now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 30)) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }

  // Move to the next day if it's weekend or holiday
  while (
    nextOpen.getDay() === 0 ||
    nextOpen.getDay() === 6 ||
    isUSHoliday(nextOpen)
  ) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }

  return nextOpen;
}

function isUSHoliday(now: Date): boolean {
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  // U.S. holidays including Good Friday
  const holidays = getUSHolidays(year);

  // Check if today is a holiday
  const isHoliday = holidays.some(
    (holiday) => holiday.getMonth() === month && holiday.getDate() === date
  );

  return isHoliday;
}

// TODO: make return format object of hours and mins and format the string in component
function formatTimeDiff(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}hrs ${minutes}mins`;
}
