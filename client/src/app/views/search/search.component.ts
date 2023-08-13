import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Log } from 'src/app/types/log';
import { SearchService } from 'src/app/services/search.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(public searchService: SearchService, private apiService: ApiService) { }
  
  subscriptions: Subscription = new Subscription();

  ngOnInit() {
    const results$ = this.searchService.currentPage$.subscribe((currentPage) => {
      console.log(this.searchService.currentPage$);
       this.searchService.getSearch().subscribe({
        next: (logs: Log[]) => {
          this.searchService.searchResult = logs;
          console.log(logs);
        },
        error: (error: { error: { message: any; }; }) => {
          console.log(error.error.message);
        }
      });
    });
    this.subscriptions.add(results$);
  }

  nextPage() {
    this.searchService.currentPage$.next(this.searchService.currentPage$.value + 1);
  }

  previousPage() {
    if (this.searchService.currentPage$.value > 1) {
      this.searchService.currentPage$.next(this.searchService.currentPage$.value - 1);
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log('unsubscribed');
      
    }
  }

}
