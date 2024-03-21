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
  return isWithinMarketHours(now);
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
function isWithinMarketHours(date: Date): boolean {
  const userTime = date.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const marketOpen = new Date(userTime);
  marketOpen.setHours(9, 30, 0); // Market opens at 9:30 AM ET
  const marketClose = new Date(userTime);
  marketClose.setHours(16, 0, 0); // Market closes at 4:00 PM ET

  return date >= marketOpen && date < marketClose;
}

// Helper functions for holiday calculations (thirdMonday, firstMonday, fourthThursday, nthWeekdayOfMonth, lastMonday) go here, unchanged.

// Function to calculate Good Friday based on Easter Sunday
function calculateGoodFriday(year: number): Date {
  // Calculate Easter Sunday (using the Computus algorithm or similar)
  const easter = calculateEaster(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2); // Good Friday is 2 days before Easter
  return goodFriday;
}

// Placeholder for Easter calculation - implement the actual Computus algorithm or use a library
function calculateEaster(year: number): Date {
  // This is a placeholder. Implement the actual algorithm or use an existing library.
  return new Date(year, 3, 14); // Example date, replace with actual calculation
}

// Function to determine if the current date is in DST - unchanged from your original implementation

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
  const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(jan, jul) !== date.getTimezoneOffset();
}
