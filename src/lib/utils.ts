import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humanReadableFileSize(sizeInBytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let index = 0;

  let _size = sizeInBytes;
  while (_size >= 1024 && index < units.length - 1) {
    _size /= 1024;
    index++;
  }

  return `${_size.toFixed(2)} ${units[index]}`;
}
