import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiInvokerService } from "../../core/api/api-invoker.service";
import { Dataset } from "../datasets/dataset";

@Injectable()
export class DatasetService {

    constructor(private apiInvokerService: ApiInvokerService) { }

    loadRules(): Observable<any> {
        return this.apiInvokerService.fetchSecured("dataset").do(
            (datasets) => {
                datasets.forEach(element => {

                });
            }
        )
    }
    
    loadByRule(codRule:string): Observable<any> {
        return this.apiInvokerService.fetchSecured("dataset/"+codRule).do(
            (datasets) => {
                datasets.forEach(element => {

                });
            }
        )
    }

    update(dataset: Dataset): Observable<any> {
        return this.apiInvokerService.postSecured("dataset", dataset).do(
            () => { }
        )
    }

    create(dataset: Dataset): Observable<any> {
        return this.apiInvokerService.putSecured("dataset", dataset).do(
            (dataset) => { }
        )
    }

    delete(id: string): Observable<any> {
        return this.apiInvokerService.deleteSecured("dataset/"+id).do(
            (dataset) =>{}
        )
    }
}