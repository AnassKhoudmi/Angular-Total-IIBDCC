import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private appstate : AppStateService,
              private loadingService:LoadingService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.appstate.setProductState({
    //   status : "LOADING"
    // })
    this.loadingService.showLoadingSpinner();
    let req = request.clone({
      headers : request.headers.set("Authorization","Bearer JWT")
    });
    return next.handle(req).pipe(
      finalize(()=> {
        // this.appstate.setProductState({
        //   status: "LOADED"
        // })
        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
