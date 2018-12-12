import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './user/user.module';

@NgModule({
  declarations: [ // 声明组件|管道|指令,才能正常使用组件（ide自动添加）
    AppComponent,
  ],
  imports: [ // 导入ng模块
    BrowserModule,
    HttpClientModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
