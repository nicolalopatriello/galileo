import { Component } from '@angular/core';
import {CarouselConfig} from 'galileo';

@Component({
  selector: 'lsicp-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent {
  public carouselConfig: CarouselConfig =  { items: [{image: 'assets/images/image-1.jpg'}, {image: 'assets/images/image-2.jpg'}]};

}
