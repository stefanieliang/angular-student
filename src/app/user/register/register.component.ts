import {Component, OnInit} from '@angular/core';
import {RegisterUser} from './register-user';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {Result} from '../../common/result';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterUser;
  codeImgSrc: string = ''; // 验证码图片base64数据

  constructor(private userService: UserService) {
    this.model = new RegisterUser();
  }

  ngOnInit() {
    // 程序初始化完毕调用一次获取验证码
    this.getCodeImg();
  }


  getCodeImg() {
    this.userService.getCodeImg().subscribe(
      (result: Result<string>) => {
        if (result.success) {
          // 获取成功
          this.codeImgSrc = 'data:image/png;base64,' + result.data;
        } else {
          alert('获取验证码失败，请重新获取！');
        }
      }
    );
  }

  register() {

  }
}
