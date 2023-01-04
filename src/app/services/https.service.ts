import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 *
 *
 * @export
 * @class HttpService
 */
@Injectable()

/**
 * A service for accessing HTTPS information.
 *
 */
export class HttpService {
  private httpOptions: any = {};
  private baseURL: string;

  constructor(private http: HttpClient, private _zone: NgZone) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  getData(dataUrl: string): Promise<any> {
    return this.http
      .get(dataUrl, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  deleteData(dataUrl: string): Promise<any> {
    return this.http
      .delete(dataUrl, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  postData(dataUrl: string, body: any): Promise<any> {
    return this.http
      .post(dataUrl, body, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  getEventSource(url): Observable<any> {
    const _events: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    const eventSource = new EventSource(url);
    eventSource.onmessage = (sse) => {
      this._zone.run(() => _events.next(JSON.parse(sse.data)));
      console.log(sse);
    };
    eventSource.onerror = (err) => _events.error(err);

    return _events.asObservable();
  }

  private handleError(error: any): Promise<any> {
    if (error.status && error.status === 401) {
      //redirectToLogin();
    }
    return Promise.reject(error.message || error);
  }
}
