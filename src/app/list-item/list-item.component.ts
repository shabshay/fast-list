import {Component, Input, Output, EventEmitter} from '@angular/core';
import { ListItem } from './list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  @Input() listItem: ListItem | null = null;
}
