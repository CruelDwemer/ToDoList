import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TaskComponent } from './task';
import { TaskListComponent } from './task-list';
import { AppComponent } from './app';
import { routing, appRoutingProviders } from './app.routing';
import { TaskDataService } from './services';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders, TaskDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
