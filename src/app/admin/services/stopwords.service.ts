import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiInvokerService } from "../../core/api/api-invoker.service";
import { Stopword } from "../stopwords/stopword";

@Injectable()
export class StopwordsService {

    constructor(private apiInvokerService: ApiInvokerService) { }

    load(): Observable<any> {
        return this.apiInvokerService.fetchSecured("stopWords").do(
            (stopwords) => {
                stopwords.forEach(element => {

                });
            }
        )
    }

    update(stopword: Stopword): Observable<any> {
        return this.apiInvokerService.postSecured("stopWords", stopword).do(
            () => { }
        )
    }

    create(stopword: Stopword): Observable<any> {
        return this.apiInvokerService.putSecured("stopWords", stopword).do(
            (stopword) => { }
        )
    }

    delete(id: string): Observable<any> {
        return this.apiInvokerService.deleteSecured("stopWords/"+id).do(
            (stopword) =>{}
        )
    }
}