export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);
  return percentage;
};

export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  if (remainingDays < 0) {
    return "Expired";
  }
  return remainingDays.toFixed(0);
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
