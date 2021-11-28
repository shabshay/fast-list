import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {ListItemComponent} from './list-item/list-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ListItemDialogComponent} from './list-item-dialog/list-item-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {ListsComponent} from './lists/lists.component';
import {ListDialogComponent} from './list-dialog/list-dialog.component';
import {ListService} from './list/list.service';
import {ListsService} from './lists/lists.service';

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'lists', component: ListsComponent},
  {path: '**', component: ListsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    ListItemDialogComponent,
    ListDialogComponent,
    ListComponent,
    ListsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [ListService, ListsService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
