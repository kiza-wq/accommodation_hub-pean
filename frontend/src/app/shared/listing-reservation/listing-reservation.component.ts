import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-listing-reservation',
  imports: [CommonModule],
  templateUrl: './listing-reservation.component.html',
})
export class ListingReservationComponent {
  price = input.required<number>();
  selecting = signal<'start' | 'end'>('start');
  dateRange = input<DateRange>({ startDate: null, endDate: null });
  disabled = input(false);
  disabledDates = input<Date[]>([]);
  dateRangeChange = output<DateRange>();
  reserve = output<number>();

  today = new Date();
  currentYear = signal(this.today.getFullYear());
  currentMonth = signal(this.today.getMonth());
  calendarDays = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1).getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  });

  nightCount = computed<number>(() => {
    const { startDate, endDate } = this.dateRange();
    if (!startDate || !endDate) return 0;
    return Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000);
  });

  isDisabled(date: Date): boolean {
    const today = new Date();
    if (date < today) return true;
    return this.disabledDates().some((d) => this.isSame(d, date));
  }

  getDayClasses(date: Date): string {
    if (this.isDisabled(date)) {
      return 'text-neutral-300 line-through cursor-not-allowed';
    }
    const start = this.isStart(date);
    const end = this.isEnd(date);
    const inRange = this.isInRange(date);
    const startOnly = start && !this.dateRange().endDate;

    if (start && end) {
      return 'bg-neutral-900 text-white rounded-full font-bold';
    }

    if (start) {
      return startOnly
        ? 'bg-neutral-900 text-white rounded-full font-bold'
        : 'bg-neutral-900 text-white rounded-l-full font-bold';
    }

    if (end) {
      return 'bg-neutral-900 text-white rounded-r-full font-bold';
    }

    if (inRange) {
      return 'bg-neutral-100 text-neutral-800 rounded-none';
    }

    if (this.isSame(this.today, date)) {
      return 'font-extrabold underline hover:bg-neutral-100 rounded-full text-neutral-900';
    }
    return 'text-neutral-700 hover:bg-neutral-100 hover:rounded-full';
  }

  isInRange(date: Date): boolean {
    const { startDate, endDate } = this.dateRange();
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  }

  isStart(date: Date): boolean {
    const s = this.dateRange().startDate;
    return !!s && this.isSame(s, date);
  }

  isEnd(date: Date): boolean {
    const s = this.dateRange().endDate;
    return !!s && this.isSame(s, date);
  }

  isSame(a: Date, b: Date) {
    return (
      a.getFullYear() == b.getFullYear() &&
      a.getMonth() == b.getMonth() &&
      a.getDate() == b.getDate()
    );
  }

  prevMonth() {
    if (this.currentMonth() == 0) {
      this.currentMonth.set(11);
      this.currentYear.update((y) => y - 1);
    } else {
      this.currentMonth.update((m) => m - 1);
    }
  }

  nextMonth() {
    if (this.currentMonth() == 11) {
      this.currentMonth.set(0);
      this.currentYear.update((y) => y + 1);
    } else {
      this.currentMonth.update((m) => m + 1);
    }
  }

  selectDate(date: Date): void {
    if (this.isDisabled(date)) return;
    const range = this.dateRange();
    if (this.selecting() == 'start' || !range.startDate) {
      this.dateRangeChange.emit({ startDate: date, endDate: null });
      this.selecting.set('end');
    } else {
      const [start, end] =
        date < range.startDate ? [date, range.startDate] : [range.startDate, date];
      this.dateRangeChange.emit({ startDate: start, endDate: end });
      this.selecting.set('start');
    }
  }
}
