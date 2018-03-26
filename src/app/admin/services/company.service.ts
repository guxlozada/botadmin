import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiInvokerService } from "../../core/api/api-invoker.service";
import { Company } from "../company/company";

@Injectable()
export class CompanyService {

    constructor(private apiInvokerService: ApiInvokerService) { }

      
    load(): Observable<any> {
        return this.apiInvokerService.fetchSecured("company").do(
            () => { }
        )
    }

    update(company: Company): Observable<any> {
        return this.apiInvokerService.postSecured("company", company).do(
            () => { }
        )
    }

    
}