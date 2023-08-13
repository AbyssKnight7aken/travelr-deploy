import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService, private router: Router) { }

  rescentLogs!: Log[];
  subscriptions: Subscription = new Subscription();
  
  ngOnInit(): void {
    const logs$ = this.apiService.getRescentLogs().subscribe(
      {
        next: (logs) => {
          this.rescentLogs = logs;
          console.log(this.rescentLogs);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    );
    this.subscriptions.add(logs$);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log('unsubscribed');
      
    }
  }
}
