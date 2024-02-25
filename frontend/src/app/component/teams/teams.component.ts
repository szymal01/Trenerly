import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent {
  value = '';

  constructor(private searchService: NbSearchService) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.value = data.term;
    });
  }
}
