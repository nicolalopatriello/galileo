import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {UserOnboardingComponent} from "./user-onboarding/user-onboarding.component";


@NgModule({
  declarations: [UserOnboardingComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    NgbPopoverModule,
    RouterModule.forChild([{
      path: '', component: UserOnboardingComponent
    }])
  ]
})
export class UserOnboardingModule {
}
