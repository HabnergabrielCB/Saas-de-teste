export function padTime(value: number): string {
  return value.toString().padStart(2, "0");
}

export function durationFromParts(
  hours: number,
  minutes: number,
  seconds: number,
): number {
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "0:00";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${padTime(minutes)}:${padTime(seconds)}`;
  }

  return `${minutes}:${padTime(seconds)}`;
}

export function formatDateLabel(isoDate: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function formatChartDate(isoDate: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(isoDate));
}

export function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = padTime(now.getMonth() + 1);
  const day = padTime(now.getDate());
  return `${year}-${month}-${day}`;
}
