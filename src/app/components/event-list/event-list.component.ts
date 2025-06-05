import { Component, Input } from '@angular/core';
import { IEvent } from '../../models/event';
import { CommonModule } from '@angular/common';
import { PillComponent } from '../pill/pill.component';
import { pillColors } from '../../models/pill-colors';
import { EventListDetailsComponent } from '../event-list-details/event-list-details.component';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, PillComponent, EventListDetailsComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent {
  @Input({ required: true }) event!: IEvent;
  today = Date.now();
  colorIndex = 0;
  viewDetails = false;

  get eventTime() {
    const eventTime = this.event.event_time.split(':');
    let time = '';
    if (Number(eventTime[0]) > 12) {
      time += Number(eventTime[0]) - 12;
      time += ':';
      time += eventTime[1];
      time += ' PM';
    } else {
      time += eventTime[0];
      time += ':';
      time += eventTime[1];
      time += ' AM';
    }
    return time;
  }

  get eventContent() {
    return this.event.content.split(',');
  }

  viewEventDetails() {
    this.viewDetails = true;
    document.body.classList.add('overflow-none');
  }

  onCloseWindow(close: boolean) {
    this.viewDetails = close;
    document.body.classList.remove('overflow-none');
  }
}
