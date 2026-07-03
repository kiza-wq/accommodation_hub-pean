import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  count = input(1);
  title = input<string>();
  subTitle = input<string>();
  countChange = output<number>();

  onReduce(): void {
    this.countChange.emit(this.count() - 1);
  }
  onAdd(): void {
    this.countChange.emit(this.count() + 1);
  }
}
