import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  template: '<div #mapEl class="h-[35vh] w-full rounded-lg z-10"></div>',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  mapEl = viewChild.required<ElementRef<HTMLDivElement>>('mapEl');
  center = input<[number, number] | undefined>(undefined);

  map: L.Map | null = null;
  marker: L.Marker | null = null;

  initialMap = effect(() => {
    const coords = this.center();
    if (!this.map) return null;
    this.marker?.remove();
    if (coords) {
      this.marker = L.marker(coords).addTo(this.map);
      this.map.setView(coords, 8);
    }
    return;
  });

  ngAfterViewInit(): void {
    const coords = this.center();
    this.map = L.map(this.mapEl().nativeElement, { zoomControl: true }).setView(
      coords ?? [51, -0.09],
      coords ? 8 : 2,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    if (coords) {
      this.marker = L.marker(coords).addTo(this.map);
    }
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }
}
