import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import { PhoneValidaterDirective } from './register/phone-validater.directive';

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegisterComponent,
    PhoneValidaterDirective
  ],
  imports: [
    CommonModule,
    FormsModule, // 使用模板驱动表单
    UserRoutingModule
  ]
})
export class UserModule {
}
