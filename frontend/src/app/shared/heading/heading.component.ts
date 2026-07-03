import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [],
  templateUrl: './heading.component.html',
})
export class HeadingComponent {
  title = input.required<string>();
  subtitle = input<string>();
  center = input(false);
}
