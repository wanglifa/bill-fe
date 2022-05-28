/*
exmaple
import { Time } from 'shared/time';
const time = new Time();
time.format('YYYY-MM-DD)
time.firstDayOfMonth()
time.firstDayofYear()
time.lastDayOfMonth()
time.lastDayofYear()
time.add(1, 'month')
time.subtract(1, 'month')
 */
export class Time {
  date: Date;
  constructor(date: Date = new Date()) {
    this.date = date
  }
  format(pattern = 'YYYY-MM-DD') {
    // 目前支持的格式有 YYYY MM DD HH mm ss SSS
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1
    const day = this.date.getDate()
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    const msecond = this.date.getMilliseconds()
    return pattern.replace(/YYYY/g, year.toString())
      .replace(/MM/, month.toString().padStart(2, '0'))
      .replace(/DD/, day.toString().padStart(2, '0'))
      .replace(/HH/, hour.toString().padStart(2, '0'))
      .replace(/mm/, minute.toString().padStart(2, '0'))
      .replace(/ss/, second.toString().padStart(2, '0'))
      .replace(/SSS/, msecond.toString().padStart(3, '0'))
  }
  getRow() {
    return this.date
  }
  firstDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0))
  }
  firstDayofYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0))
  }
  lastDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0))
  }
  lastDayofYear() {
    return new Time(new Date(this.date.getFullYear() + 1, 0, 1, 0, 0, 0))
  }
  add(amount: number, unit: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'millisecond') {
    const date = new Date(this.date.getTime())
    switch (unit) {
      case 'day':
        date.setDate(date.getDate() + amount)
        break
      case 'month':
        const d = date.getDate()
        date.setDate(1)
        date.setMonth(date.getMonth() + amount)
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
        date.setDate(Math.min(d, d2))
        break
      case 'year':
        date.setFullYear(date.getFullYear() + amount)
        break
      case 'hour':
        date.setHours(date.getHours() + amount)
        break
      case 'minute':
        date.setMinutes(date.getMinutes() + amount)
        break
      case 'second':
        date.setSeconds(date.getSeconds() + amount)
        break
      case 'millisecond':
        date.setMilliseconds(date.getMilliseconds() + amount)
        break
    }
  }
}