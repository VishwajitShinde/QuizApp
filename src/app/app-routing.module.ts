import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { AuthGuard } from './auth/auth.guard';

import { SigninComponent } from './components/basic/signin/signin.component';
import { SignupComponent } from './components/basic/signup/signup.component';

//import { AddQuestionsComponent } from './components/questions/add-questions/add-questions.component';
import { CreateQuestionsComponent } from "./components/questions/create-questions/create-questions.component";


const routes: Routes = [
  { path: "register", component: RegisterComponent, canActivate : [AuthGuard]},
  { path: "quiz", component: QuizComponent, canActivate : [AuthGuard]},
  { path: "result", component: ResultComponent, canActivate : [AuthGuard]},
  { path: "", redirectTo: "/register", pathMatch: "full" },

  { path: 'signup', component: SignupComponent,  canActivate : [AuthGuard] },
  { path: 'signin', component: SigninComponent,  canActivate : [AuthGuard] },

  //{ path: 'add-questions', component: AddQuestionsComponent,  canActivate : [AuthGuard] },
  
  { path: 'add-questions', component: CreateQuestionsComponent,  canActivate : [AuthGuard] },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
