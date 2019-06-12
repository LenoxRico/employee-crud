import { Component, OnInit } from '@angular/core';
import { CoreService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CAPCO';
  show = false;

  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.coreService.getSpinner().subscribe(state => {
      setTimeout(() => {
        this.show = state.show;
      }, 0);
    });
  }
}
