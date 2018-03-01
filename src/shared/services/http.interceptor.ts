import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ApplicationService } from './application.service';
import { GlobalService } from './global.service';

@Injectable()
export class HttpIntercept implements HttpInterceptor {
    constructor(
        private as: ApplicationService,
        private globalSrv: GlobalService ) {
        console.log('HttpIntercept consturctor');
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let as = this.as;
        
        var head = {};
        // if (this.globalSrv.demoMode == "1")
        //     head = { headers: req.headers.set("demo", this.globalSrv.demoMode) };

        head = { headers: req.headers.set("fecha", new Date().getTime().toString()) };
        
        // Clone the request to add the new header.
        // const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue") });    
        var authReq = req.clone(head);
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
