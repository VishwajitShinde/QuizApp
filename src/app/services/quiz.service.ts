import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private serviceURL: string;

  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.serviceURL = environment.quizServiceURL;
  }

  //---------------- Helper Methods---------------

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }


  private getRequestHeaders() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.authService.getToken()}`
    }
    const requestOptions = { headers: new HttpHeaders(headerDict), };
    return requestOptions;
  }



  //---------------- Http Methods---------------

  registerParticipant(name: string, email: string) {
    var body = {
      name: name,
      email: email
    }
    return this.http.post(this.serviceURL + '/api/registerParticipant', body);
  }

  signupUser(signup) {
    return this.http.post(this.serviceURL + '/api/auth/signup', signup);
  }

  signInUser(signIn) {
    return this.http.post(this.serviceURL + '/api/auth/signin', signIn);
  }

  addQuestion(question) {
    return this.http.post(this.serviceURL + '/api/addQuestion', question, this.getRequestHeaders());
  }

  getQuestions() {
    return this.http.get(this.serviceURL + '/api/questions', this.getRequestHeaders());
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.serviceURL + '/api/Answers', body, this.getRequestHeaders());
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.serviceURL + "/api/UpdateOutput", body, this.getRequestHeaders());
  }
}