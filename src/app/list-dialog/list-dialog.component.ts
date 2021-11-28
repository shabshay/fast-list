import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {List} from '../list/list';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent implements OnInit {
  private backupItem: Partial<List> = { ...this.data.list };

  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListDialogData
  ) {}

  cancel(): void {
    this.data.list.name = this.backupItem.name;
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }
}

export interface ListDialogData {
  list: Partial<List>;
}

export interface ListDialogResult {
  list: List;
}
