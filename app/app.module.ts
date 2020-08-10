import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { AboutComponent } from './about/about.component';
import { LocalDataService } from './services/local-data.service'

/* libraries */
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    AddNoteComponent,
    AddTodoComponent,
    AboutComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule ,
    RouterModule.forRoot([
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'add-note',
        component: AddNoteComponent
      },
      {
        path: 'add-todo',
        component: AddTodoComponent
      },
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '**',
        component: MainComponent
      },


    ]),

    ColorPickerModule

  ],
  providers: [LocalDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
