import {Component, OnInit} from '@angular/core';
import {List} from '../list/list';
import {ListDialogComponent, ListDialogResult} from '../list-dialog/list-dialog.component';
import firebase from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {v4 as uuidv4} from 'uuid';
import {ListsService} from './lists.service';
import FieldValue = firebase.firestore.FieldValue;


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: List[];

  constructor(
    private dialog: MatDialog,
    private listsService: ListsService
  ) {
  }

  ngOnInit(): void {
    this.listsService.getLists()
      .subscribe({
        next: (lists: List[]) => {
          this.lists = lists;
        }
      });
  }

  createList(): void {
    const dialogRef = this.dialog.open(ListDialogComponent, {
      width: '270px',
      data: {
        list: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: ListDialogResult | undefined) => {
        if (!result) {
          return;
        }
        const list = {
          ...result.list,
          /*id: uuidv4(),*/
          timestamp: FieldValue.serverTimestamp()
        } as List;

        this.listsService.addList(list).then();
      });
  }

  delete(list: List): void {
    this.listsService.deleteList(list).then();
  }
}
