import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location/location.service';
import { Location } from '../models/location';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  locations?: Location[];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocationsList().subscribe((data: any) => {
      this.locations = data.results;
      console.log(this.locations);
    });
  }
}
