import {Component} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: []
})
export class CardsComponent {
  markDown = `
  \`gll-simple-card\` component allow us to create a card with custom background.

\`\`\`markup
     <gll-simple-card [backgroundColor]="'red'">
        SimpleCard with red Background
     </gll-simple-card>
\`\`\`
  `;

  constructor() {
  }

}
