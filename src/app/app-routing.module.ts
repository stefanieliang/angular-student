import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

// 配置路由
const routes: Routes = [
    // {path: '**', component: NotFoundComponent}, // ** 通配符
  {path: '', pathMatch: 'full', component: HomeComponent}, // ' '表示根路径，必须有pathMatch: 'full'配置项
  {path: '**', redirectTo: '/user/login'}, // redirectTo后为真实的url地址
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
