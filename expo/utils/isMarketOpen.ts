/**
 * Returns true if the NYSE/NASDAQ market is open, considering weekdays, DST adjustments for Eastern Time, and a simplified version of U.S. holidays.
 */
export function isMarketOpen(): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const dayOfWeek = now.getDay();

  // U.S. holidays including Good Friday
  const holidays = getUSHolidays(year);

  // Check if today is a holiday
  const isHoliday = holidays.some(
    (holiday) => holiday.getMonth() === month && holiday.getDate() === date
  );

  // Check for weekends and holidays
  if (dayOfWeek === 0 || dayOfWeek === 6 || isHoliday) {
    return false;
  }

  // Check for market hours, adjusting for user's local timezone to ET
  return isWithinMarketHours();
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
