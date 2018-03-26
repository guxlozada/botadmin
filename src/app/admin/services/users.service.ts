import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiInvokerService } from "../../core/api/api-invoker.service";
import { User } from "../users/user";

@Injectable()
export class UsersService {

    constructor(private apiInvokerService: ApiInvokerService) { }

    load(): Observable<any> {
        return this.apiInvokerService.fetchSecured("userAdmin").do(
            (users) => {
                users.forEach(element => {

                });
            }
        )
    }

    update(user: User): Observable<any> {
        return this.apiInvokerService.postSecured("userAdmin", user).do(
            () => { }
        )
    }

    create(user: User): Observable<any> {
        return this.apiInvokerService.putSecured("userAdmin", user).do(
            (user) => { }
        )
    }

    delete(id: string): Observable<any> {
        return this.apiInvokerService.deleteSecured("userAdmin/"+id).do(
            (user) =>{}
        )
    }

    generatePassword(id: string): Observable<any> {
        return this.apiInvokerService.postSecured("userAdminPassword", {id: id}).do(
            () =>{}
        )
    }
}