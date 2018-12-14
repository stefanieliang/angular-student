import {Component, OnInit} from '@angular/core';
import {fromEvent, interval, Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, map, take} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // 1.Observable对象的创建,构造函数中传入订阅函数，其参数是观察者
    const ob1 = new Observable((observer) => {
      setInterval(() => {
        // 请求成功，发送数据
        observer.next({success: true, data: 1});
        observer.next({success: true, data: 2});
        observer.next({success: true, data: 3});
        // 如果出错，执行error()
        // observer.error({success: false, data: 0});
        // 如果请求结束，执行complete()
        // observer.complete();
      }, 2000);
    });
    // 获得实例后，订阅
    const subscription = ob1.subscribe(
      (result) => {
        console.log(result);
        // 通过订阅对象可取消Observable请求
        subscription.unsubscribe();
      }, (error) => {
        console.error(error);
      }, () => {
        console.log('complete!');
      });

    // 2.通过promise创建
    const ob2 = fromPromise(fetch('assets/data.json'));
    ob2.subscribe({
      next(resp) {
        console.log(resp);
      }, error(error) {
        console.log(error);
      }
    });

    // 3.通过定时器构造（常用）
    const ob3 = interval(1000).pipe(
      take(5) // 执行5次就取消
    );
    ob3.subscribe(val => console.log('计数：' + val));

    // 4.通过事件构造
    const ob4 = fromEvent(document, 'click');
    const subscription4 = ob4.subscribe((evt: MouseEvent) => {
      console.log(evt.clientX, evt.clientY);
    });
    // 取消订阅
    subscription4.unsubscribe();

    // 5.通过已存在的值
    const ob5 = of(1, 2, 3, 4); // Observable<number>
    const ob6 = of([1, 2, 3]); // Observable<Array<number>>
    const ob7 = of({foo: 'bar'}); // Observable<{foo:string}>

    // 操作符
    ob5.pipe(
      // filter过滤
      filter(n => n % 2 !== 0), // 过滤奇数
      // map数据格式加工转换
      map(n => n * n), // 求平方
      // ...
    ).subscribe(
      n => console.log(n)
    );

    // 错误处理，方式一:ob.subscribe(next,error)
    // 错误处理，方式二:操作符catchError(error=>of(...))，
    // 使用了方式二，方式一的error回调就不会执行了，数据会进入next流程

  }
}
