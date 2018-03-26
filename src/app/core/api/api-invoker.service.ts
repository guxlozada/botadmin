import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";

import { ApiConfig } from './api-config';
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class ApiInvokerService {

  constructor(private http: Http, private apiConfig: ApiConfig) { }

  public fetchSecured(url): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      headers.append('Authorization', 'Bearer ' + currentUser.token);
    }
    return this.http.get(this.apiConfig.url + url, { headers: headers })
      .map(this.extractData)
      .catch(this.handleError)
  }

  public fetch(url): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=ISO-8859-1');
    return this.http.get(this.apiConfig.url + url,{ headers: headers })
      .map(this.extractData)
      .catch(this.handleError)
  }

  public post(url, data): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=ISO-8859-1');
    return this.http.post(this.apiConfig.url + url, JSON.stringify(data), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError)
  }

  public postSecured(url, data): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=ISO-8859-1');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      headers.append('Authorization', 'Bearer ' + currentUser.token);
    }
    return this.http.post(this.apiConfig.url + url, JSON.stringify(data), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError)
  }

  public put(url, data): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=ISO-8859-1');
    return this.http.put(this.apiConfig.url + url, JSON.stringify(data), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError)
  }

  public putSecured(url, data): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=ISO-8859-1');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      headers.append('Authorization', 'Bearer ' + currentUser.token);
    }
    return this.http.put(this.apiConfig.url + url, JSON.stringify(data), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError)
  }

  public delete(url): Observable<any> {
    return this.http.delete(this.apiConfig.url + url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public deleteSecured(url): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      headers.append('Authorization', 'Bearer ' + currentUser.token);
    }
    return this.http.delete(this.apiConfig.url + url, { headers: headers })
      .map(this.extractData)
      .catch(this.handleError)
  }


  private extractData(res: Response) {
    if (res.ok) {
      if (res.text()) {
        let body = res.json();
        if (body) {
          return body.data || body
        }
      } else {
        return {}
      }
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    if (error.text()) {
      let body = error.json();
      if (body) {
        console.log(error.text());
        return Observable.throw(body);
      }
    } else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw({label: "", message: errMsg});
    }
  }

}


