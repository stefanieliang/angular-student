import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './user/user.module';
import {RxjsModule} from './rxjs/rxjs.module';
import {HomeComponent} from './home/home.component';
import {MainModule} from './main/main.module';
import {CompCommunicateModule} from './comp-communicate/comp-communicate.module';

@NgModule({
  declarations: [ // 声明组件|管道|指令,才能正常使用组件（ide自动添加）
    AppComponent, HomeComponent
  ],
  imports: [ // 导入ng模块，需要手动导入
    BrowserModule,
    HttpClientModule,
    UserModule,
    RxjsModule,
    CompCommunicateModule,
    MainModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
