export function FormatDate(date) {
  // Check if date is a valid Date object
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object provided.");
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return formattedDate;
}
