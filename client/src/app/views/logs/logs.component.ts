import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService) { }

  logs!: Log[];
  pages!: number;
  subscriptions: Subscription = new Subscription();
  isLoading: boolean = true;
  showPagination: boolean = false;

  ngOnInit(): void {
    const allLogs$ = this.apiService.getCount().subscribe(
      {
        next: (result) => {

          this.pages = result;
          console.log(result);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    );
    this.subscriptions.add(allLogs$);
  }


  currentPage$ = new BehaviorSubject<number>(1);

  currentPageLogs$ = this.currentPage$.pipe(
    switchMap((currentPage) => this.apiService.getLogs(currentPage))
  ).subscribe(
    {
      next: (result) => {
        this.logs = result;
        console.log(this.logs);
        this.isLoading = false;
        this.showPagination = true;
        this.subscriptions.add(this.currentPageLogs$)
      },
      error: (error) => {
        console.log(error.error.message);
      }
    }
    )

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log('unsubscribed');
      
    }
  }

}


