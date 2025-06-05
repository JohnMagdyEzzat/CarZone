import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from '../../models/event';
import { PillComponent } from "../pill/pill.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list-details',
  imports: [PillComponent,CommonModule],
  templateUrl: './event-list-details.component.html',
  styleUrl: './event-list-details.component.css',
})
export class EventListDetailsComponent {
  @Input({ required: true }) event!: IEvent;
  @Input({ required: true }) eventContent!: string[];
  @Input({ required: true }) eventTime!: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  closeWindow(): void {
    this.close.emit(false);
  }
}
