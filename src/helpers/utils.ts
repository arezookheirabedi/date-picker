import dayjs from 'dayjs';
import jalaliday from "jalaliday";

export const toPersianDigit = (str: any) => {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w: any) => id[+w]);
};
dayjs.extend(jalaliday);
export function getPersianDate(data: string) {
  const newDate = dayjs(data)
    .calendar("jalali")
    .format("YYYY-MM-DD")
    .toPersianDigits()
  return newDate
}
export function unixToDateObject(unix: number) {
  const date = dayjs(unix).calendar("jalali");
  return {
    year: Number(date.format("YYYY")),
    month: Number(date.format("MM")),
    day: Number(date.format("DD")),
  };
} 