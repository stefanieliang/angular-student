import {Component, OnInit} from '@angular/core';
import {RegisterUser} from './register-user';
import {User, UserService} from '../user.service';
import {Result} from '../../common/result';
import {scan, take} from 'rxjs/operators';
import {interval} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterUser;
  codeImgSrc: string = ''; // 验证码图片base64数据
  isDisabled = false; // 开启禁用短信获取按钮
  bthText = '获取短信验证码'; // 动态按钮文字

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

  getCodeSms() {
    this.userService.getCodeSms(this.model.phone).subscribe(
      (result: Result<string>) => {
        if (result.success) {
          // 获取成功,开启60s倒计时，禁用按钮
          this.isDisabled = true;
          interval(1000).pipe(
            scan(i => i - 1, 60), // 从60开始倒计时
            take(60) // 执行60次结束
          ).subscribe(i => {
            if (i > 0) {
              this.bthText = i + 's';
            } else {
              this.bthText = '获取短信验证码';
              this.isDisabled = false;
            }
          });
        } else {
          alert('获取验证码失败，请重新获取！');
        }
      }
    );
  }

  register() {
    this.userService.register(this.model).subscribe(
      (result: Result<User>) => {
        console.log(result)
        if (result.success) {
          // 注册成功，跳转主页
          alert('注册成功');
        } else {
          alert('注册失败');
        }
      }
    );
  }
}
