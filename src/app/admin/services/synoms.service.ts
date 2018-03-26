import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiInvokerService } from "../../core/api/api-invoker.service";
import { Synom } from "../synoms/synom";

@Injectable()
export class SynomsService {

    constructor(private apiInvokerService: ApiInvokerService) { }

    load(): Observable<any> {
        return this.apiInvokerService.fetchSecured("synoms").do(
            (synoms) => {
                synoms.forEach(element => {

                });
            }
        )
    }

    update(synom: Synom): Observable<any> {
        return this.apiInvokerService.postSecured("synoms", synom).do(
            () => { }
        )
    }

    create(synom: Synom): Observable<any> {
        return this.apiInvokerService.putSecured("synoms", synom).do(
            (synom) => { }
        )
    }

    delete(id: string): Observable<any> {
        return this.apiInvokerService.deleteSecured("synoms/"+id).do(
            (synom) =>{}
        )
    }
}