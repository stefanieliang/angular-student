import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from './login/login-user';
import {Result} from '../common/result';

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

  // 依赖注入
  constructor(private http: HttpClient) {
  }

  login(user: LoginUser) {
    // 返回的结果是observable对象
    return this.http.post<Result<User>>(this.url + 'login', user);
  }

  // 注册-获取图形验证码
  getCodeImg() {
    return this.http.get(this.url + 'code-img');
  }

  // 注册-校验手机号是否已存在
  verifyPhone(phone) {
    return this.http.post(this.url + 'verify-phone', {phone});
  }
}
