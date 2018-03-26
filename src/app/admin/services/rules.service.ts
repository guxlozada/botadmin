import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiInvokerService } from "../../core/api/api-invoker.service";
import { Rule } from "../rules/rule";

@Injectable()
export class RulesService {

    constructor(private apiInvokerService: ApiInvokerService) { }

    load(): Observable<any> {
        return this.apiInvokerService.fetchSecured("rules").do(
            (rules) => {
                rules.forEach(element => {
                });
            }
        )
    }

    findById(id:string): Observable<any> {
        return this.apiInvokerService.fetchSecured("rules/"+id).do(
            (rule) => {}
        );
    }

    update(rule: Rule): Observable<any> {
        return this.apiInvokerService.postSecured("rules", rule).do(
            () => { }
        )
    }

    create(rule: Rule): Observable<any> {
        return this.apiInvokerService.putSecured("rules", rule).do(
            (rule) => { }
        )
    }

    delete(id: string): Observable<any> {
        return this.apiInvokerService.deleteSecured("rules/"+id).do(
            (rule) =>{}
        )
    }
}