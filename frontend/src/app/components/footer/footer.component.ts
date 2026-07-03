import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  faBrandTwitter,
  faBrandInstagram,
  faBrandLinkedin,
  faBrandGooglePlay,
  faBrandAppStoreIos,
} from '@ng-icons/font-awesome/brands';

@Component({
  selector: 'app-footer',
  imports: [NgIcon,RouterLink],
  providers: [
    provideIcons({
      faBrandTwitter,
      faBrandInstagram,
      faBrandLinkedin,
      faBrandGooglePlay,
      faBrandAppStoreIos,
    }),
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  logo: string = '/logo.png';
  ds: string = './ds-logo.png';
}
