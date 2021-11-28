import {Component, OnInit} from '@angular/core';
import {ListItem} from '../list-item/list-item';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ListItemDialogComponent, ListItemDialogResult} from '../list-item-dialog/list-item-dialog.component';
import firebase from 'firebase';
import {List} from './list';
import {ListService} from './list.service';
import {ListsService} from '../lists/lists.service';
import FieldValue = firebase.firestore.FieldValue;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: List;
  listItems: ListItem[];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private listService: ListService,
    private listsService: ListsService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        if (params.id) {
          const listId = params.id;
          this.listsService.getList(listId).subscribe({
            next: (list: List) => {
              this.list = list;
              if (list?.id) {
                this.initListItems();
              }
            }
          });
        }
      });
  }

  private initListItems(): void {
    this.listService.getListItems(this.list.id).subscribe({
      next: (item: ListItem[]) => {
        this.listItems = item.sort((a: ListItem, b: ListItem) => a.timestamp > b.timestamp ? 1 : -1);
      }
    });
  }

  newListItem(): void {
    const dialogRef = this.dialog.open(ListItemDialogComponent, {
      width: '270px',
      data: {
        listItem: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: ListItemDialogResult | undefined) => {
        if (!result) {
          return;
        }
        const item = {
          ...result.listItem,
          timestamp: FieldValue.serverTimestamp()
        } as ListItem;

        this.listService.addListItem(this.list.id, item).then();
      });
  }

}
