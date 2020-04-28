import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    this._matIconRegistry.addSvgIcon(
      'linkedin',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/linkedin-3.svg'
      )
    );
    this._matIconRegistry.addSvgIcon(
      'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/github-3.svg'
      )
    );
  }
}
