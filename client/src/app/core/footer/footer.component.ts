import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor( private router: Router){}

  time$ = interval(1000).pipe(map(() => new Date()));
}
