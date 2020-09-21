import {Component, OnInit} from '@angular/core';
import {GalileoThemeService} from '@nik_90/ngx-galileo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private galileoThemeService: GalileoThemeService) {
  }

  ngOnInit(): void {
   this.galileoThemeService.setTheme('galileoCustomTheme');
  }
}
