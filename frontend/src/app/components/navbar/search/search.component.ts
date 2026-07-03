import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMicro } from '@ng-icons/heroicons/micro';

@Component({
  selector: 'app-search',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroMagnifyingGlassMicro })],
  templateUrl: './search.component.html',
})
export class SearchComponent {}
