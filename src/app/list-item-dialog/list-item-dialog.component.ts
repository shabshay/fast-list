import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ListItem } from '../list-item/list-item';

@Component({
  selector: 'app-list-item-dialog',
  templateUrl: './list-item-dialog.component.html',
  styleUrls: ['./list-item-dialog.component.css']
})
export class ListItemDialogComponent implements OnInit {
  private backupItem: Partial<ListItem> = { ...this.data.listItem };

  constructor(
    public dialogRef: MatDialogRef<ListItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListItemDialogData
  ) {}

  cancel(): void {
    this.data.listItem.text = this.backupItem.text;
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }
}

export interface ListItemDialogData {
  listItem: Partial<ListItem>;
}

export interface ListItemDialogResult {
  listItem: ListItem;
}
