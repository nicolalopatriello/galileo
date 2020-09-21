import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-layouts',
  templateUrl: './auth-layouts.component.html',
  styles: []
})
export class AuthLayoutsComponent {

  constructor(private router: Router) {
  }

  markDown = `
\`AuthLayout\` allow us to create common sign-in, sign-up and forgot password page.


\`\`\`markup
  <gll-auth-layout></gll-auth-layout>
\`\`\`

if \`carouselConfig\` is provided, in all pages will be with a carousel
  `;

  showAuthPages(page: string) {
    this.router.navigate(['auth', page])
  }
}
