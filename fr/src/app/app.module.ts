import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ApplicationService } from './services/application.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { RedirectHtmlInterceptor } from './shared/interceptors/redirect-html.interceptor';
import { HeaderInterceptor } from './shared/interceptors/header.interceptor';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SparklineModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
//get browser information
const IisIE =
  window.navigator.userAgent.indexOf('MSIE') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [AppComponent],
  providers: [
    ApplicationService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RedirectHtmlInterceptor,
    //   multi: true,
    // },
    MsalGuard,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
  imports: [
    BrowserModule,
    CoreModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    SparklineModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'c84c3b5b-aa1e-4da7-816e-7fcf9e22960f',
          redirectUri: 'http://localhost:4200',
          authority:
            'https://login.microsoftonline.com/8c3dad1d-b6bc-4f8b-939b-8263372eced6',
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: IisIE,
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.Read']],
          [
            'localhost',
            ['api://b8b46961-3706-4e35-a336-5327e93770ae/Api.Scope'],
          ],
        ]),
      }
    ),
  ],
})
export class AppModule {}
