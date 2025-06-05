import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { IEvent } from '../../models/event';
import { tap } from 'rxjs';
import { EventListComponent } from '../event-list/event-list.component';

@Component({
  selector: 'app-events',
  imports: [EventListComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  eventsService = inject(EventService);
  events: IEvent[] = [];
  constructor() {}
  ngOnInit(): void {
    this.loadEvents();
  }
  loadEvents() {
    this.eventsService
      .getAllEvents()
      .pipe(
        tap((res) => {
          res.data.sort((event, event2) => {
            const dateTimestamp = Date.parse(event.event_date);
            const dateTimestamp2 = Date.parse(event2.event_date);
            return dateTimestamp - dateTimestamp2;
          });
          const todayTimeStamp = Date.now();
          res.data.forEach((event) => {
            if (Date.parse(event.event_date) >= todayTimeStamp) {
              this.events.push(event);
            }
          });
        })
      )
      .subscribe();
  }
}
