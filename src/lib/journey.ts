export function matchesYear(range: string, year: string) {
  if (year === "all") return true;
  const years = range.match(/\d{4}/g)?.map(Number);
  if (!years?.length || !/^\d{4}$/.test(year)) return false;
  const end = years[1] ?? (range.includes("—") ? Infinity : years[0]);
  return Number(year) >= years[0] && Number(year) <= end;
}
