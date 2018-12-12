import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// 配置路由
const routes: Routes = [
    // {path: '**', component: NotFoundComponent}, // ** 通配符
  {path: '**', redirectTo: '/user/login'}, // redirectTo后为真实的url地址
  {path: '', pathMatch: 'full', redirectTo: '/user/login'}, // ' '表示根路径，必须有pathMatch: 'full'配置项
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
