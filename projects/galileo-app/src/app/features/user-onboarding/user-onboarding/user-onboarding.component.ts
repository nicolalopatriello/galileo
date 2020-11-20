import {AfterViewInit, Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {GalileoService, UserOnBoardingService} from '../../../../../../galileo/src/lib/services';

@Component({
  selector: 'app-user-onboarding',
  templateUrl: './user-onboarding.component.html',
  styles: []
})
export class UserOnboardingComponent implements AfterViewInit {

  @ViewChild('complexElementOne') complexElementOne: ElementRef<any>;
  @ViewChild('explanationOne', {static: true}) explanationOne: TemplateRef<any>;

  @ViewChild('complexElementTwo') complexElementTwo: ElementRef<any>;
  @ViewChild('explanationTwo', {static: true}) explanationTwo: TemplateRef<any>;


  constructor(public userOnBoardingService: UserOnBoardingService) {
  }

  ngAfterViewInit(): void {
    this.userOnBoardingService.showPopover({where: this.complexElementOne, what: this.explanationOne});
  }

  explanationOneGotInt() {
    this.userOnBoardingService.showPopover({where: this.complexElementTwo, what: this.explanationTwo});
  }


  markDown = `
  \`Galileo\` \`UserOnBoardingService\` allow us to show custom popover to defined html element.
  `;


}
