import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import {HttpClientModule, HttpClient, HttpHandler} from '@angular/common/http';

// Below are Custom Modules Required for App
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

// Localization  Requirements 
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import { AddQuestionsComponent } from './components/questions/add-questions/add-questions.component';
import { SigninComponent } from './components/basic/signin/signin.component';
import { SignupComponent } from './components/basic/signup/signup.component';
import { CreateQuestionsComponent } from './components/questions/create-questions/create-questions.component';

/*
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';

*/

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// Custom Localizer 
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

    RegisterComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
    //AddQuestionsComponent,
    SigninComponent,
    SignupComponent,
    CreateQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
    
  ],
  exports: [AppRoutingModule],
  providers: [ 
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      deps: [AuthService,HttpClient]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
      deps: [AuthService,HttpClient]
    }
    */
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
