import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  value = '';

  constructor(private searchService: NbSearchService) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.value = data.term;
    });
  }
}
