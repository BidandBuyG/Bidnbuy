
export function calculateTimeLeft(endTime: Date): import("@/store/auction-store").TimeLeft {
  const totalMs = Math.max(0, endTime.getTime() - Date.now());
  const hours = Math.floor(totalMs / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, totalMs };
}