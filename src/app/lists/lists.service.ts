import {AngularFirestore} from '@angular/fire/firestore';
import {List} from '../list/list';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ListsService {
  constructor(private store: AngularFirestore) {
  }

  getLists(): Observable<List[]> {
    const subject = new BehaviorSubject<List[]>([]);
    this.store.collection('lists').valueChanges({idField: 'id'}).subscribe((val: List[]) => {
      subject.next(val);
    });
    return subject;
  }

  getList(listId: string): Observable<List> {
    const subject = new BehaviorSubject<List>({} as List);
    this.store.collection('lists').doc(listId).valueChanges({idField: 'id'})
      .subscribe((list: List) => {
        subject.next(list);
      });
    return subject;
  }

  async addList(list: List): Promise<void> {
    await this.store.collection('lists').add(list);
  }

  async deleteList(list: List): Promise<void> {
    await this.store.collection('lists').doc(list.id).delete();
  }
}
