import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) {
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
 
 
   //---------------- Http Methods---------------
 
   registerParticipant(name: string, email: string) {
     var body = {
       name: name,
       email: email
     }
     return this.http.post(this.serviceURL + '/api/registerParticipant', body);
   }
 
   getQuestions() {
     return this.http.get(this.serviceURL + '/api/questions');
   }
 
   getAnswers() {
     var body = this.qns.map(x => x.QnID);
     return this.http.post(this.serviceURL + '/api/Answers', body);
   }
 
   submitScore() {
     var body = JSON.parse(localStorage.getItem('participant'));
     body.Score = this.correctAnswerCount;
     body.TimeSpent = this.seconds;
     return this.http.post(this.serviceURL + "/api/UpdateOutput", body);
   }
 
   addQuestion() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.serviceURL + '/api/Answers', body);
  }
}
