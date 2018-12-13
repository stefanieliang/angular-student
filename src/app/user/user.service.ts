import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from './login/login-user';
import {Result} from '../common/result';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {RegisterUser} from './register/register-user';

export interface User {
  id: number;
  name: string;
}

// @Injectable标记其可以依赖注入，是单例模式，可将公共数据存入此中
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = '/api/users/';

  user: User = null; // 缓存登录用户信息

  // 依赖注入
  constructor(private http: HttpClient) {
  }

  login(user: LoginUser) {
    // 返回的结果是observable对象
    return this.http.post<Result<User>>(this.url + 'login', user).pipe(
      map((r: Result<User>) => {
        if (r.success) {
          this.user = r.data;
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => of(false))
    );
  }

  // 注册-校验手机号是否已存在
  verifyPhone(phone) {
    return this.http.post(this.url + 'verify-phone', {phone});
  }

  // 注册-获取图形验证码
  getCodeImg() {
    return this.http.get(this.url + 'code-img');
  }

  // 注册-校验图片验证码
  verifyCodeImg(code) {
    return this.http.post(this.url + 'verify-code-img', {code});
  }

  // 获取短信验证码
  getCodeSms(phone) {
    return this.http.get('api/code/' + phone);
  }

  // 注册方法
  register(user: RegisterUser) {
    return this.http.post(this.url + 'register', {
      phone: user.phone,
      password: user.password
    });
  }
}
