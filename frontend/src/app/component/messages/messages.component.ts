import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];

  sendMessage(event: any, userName: string, avatar: string, reply: boolean) {
    const files = !event.files
      ? []
      : event.files.map((file: { src: any; type: any }) => {
          return {
            url: file.src,
            type: file.type,
            icon: 'file-text-outline',
          };
        });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: reply,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: userName,
        avatar: avatar,
      },
    });
  }
  locations?: Location[];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocationsList().subscribe((data: any) => {
      this.locations = data.results;
      // console.log(this.locations);
    });
  }
}
