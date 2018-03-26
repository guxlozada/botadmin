import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiInvokerService } from '../core/api/api-invoker.service';

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor(private apiInvokerService: ApiInvokerService) { }

  login(username: string, password: string): Observable<any> { 
    var data = { userId: username, password: password };
    return this.apiInvokerService.post('authentication', data).do(
      (user) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    console.log("en localstorage->"+localStorage.getItem("currentUser"));
  }

  userInfo(): Observable<any> {
    return this.apiInvokerService.fetchSecured('authentication').do(
      (user) => {
        console.log("user data->" ,user.userId, user.name, user.mail);
      }
    );
  }

  reset(username: string, mail: string): Observable<any> {
    var data = { username: username, mail: mail};
    return this.apiInvokerService.post('resetClave', data).do (
      (user) => {}
    );
  }

  botStatus(): Observable<any> {
    return this.apiInvokerService.fetch('botStatus').do(
      (status) =>{}
    );
  }

  createAdminUser(code:string, mail:string, name:string): Observable<any> {
    var data = {code: code, mail:mail, name:name};
    return this.apiInvokerService.put('createAdmin', data).do(
      (user) => {}
    )
  }

}
