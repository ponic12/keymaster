import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { ApplicationService } from './services/application.service';


@Injectable()
export class HttpIntercept implements HttpInterceptor {
    constructor(private as: ApplicationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let as = this.as;
        // Clone the request to add the new header.
        // const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue") });
        const authReq = req.clone();
        as.showLoading();
        //send the newly created request
        return next.handle(authReq)
            .map(resp => {
                console.log("Response:" + JSON.stringify(resp));
                return resp;
            }).do(event => {
                // do something with the response
                // let evt = event.clone({ body: resolveReferences(event.body) })
                if (event instanceof HttpResponse) {
                    as.hideLoading();
                }
            })
            .catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log("Error Occurred");
                console.log(error);
                as.hideLoading();
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
