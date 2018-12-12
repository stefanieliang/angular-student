import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {UserService} from '../user.service';
import {Result} from '../../common/result';
import {catchError, map} from 'rxjs/operators';

// @Directive 指令装饰器
@Directive({
  selector: '[appPhoneValidater]', // 属性选择器
  // providers 确定创建的指令添加到哪个模块集合中去
  providers: [
    // 系统想要使用自定义的异步校验器需加此行
    {provide: NG_ASYNC_VALIDATORS, useExisting: PhoneValidaterDirective, multi: true}
  ]
})
export class PhoneValidaterDirective {

  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // control.value获取当前输入控件的值，即phone
    // rxjs编程
    return this.userService.verifyPhone(control.value).pipe(
      // 通过管道操作pipe将返回数据进行加工处理
      // 得到的数据结构是Observable<Result<string>>,但是当前函数需要的是Observable<ValidationErrors>
      // 使用map操作符进行数据转换
      map((r: Result<string>) => {
        // null说明校验通过
        return r.success ? null : {verifyPhone: true};
      }),
      catchError(e => of({verifyPhone: true}))
    );
  }

}
