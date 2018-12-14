import {Component} from '@angular/core';
import {LoginUser} from './login-user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginUser;

  constructor(private userService: UserService,
              private router: Router) {
    this.model = new LoginUser();
  }

  login() {
    // 发送请求
    // 返回的结果是Observable对象
    return this.userService.login(this.model).subscribe(
      (result: boolean) => {
        if (result) {
          // 登录成功，跳转至首页
          this.router.navigate(['/main']);
        } else {
          alert('登录失败！');
        }
      }
    );
  }

}
