import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ListItem} from '../list-item/list-item';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ListService {
  constructor(private store: AngularFirestore) {
  }

  getListItems(listId: string): Observable<ListItem[]> {
    const subject = new BehaviorSubject<ListItem[]>([]);
    const collection: AngularFirestoreCollection<ListItem> = this.store.collection(listId);
    collection.valueChanges({idField: 'id'}).subscribe((val: ListItem[]) => {
      subject.next(val);
    });
    return subject;
  }

  async addListItem(listId: string, item: ListItem): Promise<void> {
    await this.store.collection(listId).add(item);
  }
}
