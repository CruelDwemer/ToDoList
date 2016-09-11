import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDataService } from '../services';
import { TaskModel } from '../models';


@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: TaskModel[] = [];
  
  public constructor(
      @Inject(TaskDataService) private taskDataService: TaskDataService,
      @Inject(Router) private router: Router
  ) {}
  public ngOnInit() {
      this.selectAll();
  }
  public add() {
      const task = this.taskDataService.create();
      this.router.navigate(['/tasks', task.id, {action:'new'}]);      
  }
  public selectExtraImportant() {
      this.tasks = this.taskDataService.getExtraImportant();
  }
  public selectImportant() {
      this.tasks = this.taskDataService.getImportant();
  }
  public selectRegular() {
      this.tasks = this.taskDataService.getRegular();
  }
  public selectAll() {
      this.tasks = this.taskDataService.getAll();
  }
  public delete(task: TaskModel) {
      this.tasks = this.taskDataService.delete(task);
  }
  public checkTask(task:TaskModel, check: HTMLInputElement) {
      if (check.checked) {
         task.setDone();
      } else {
          task.setActive();
      }
  }
  
}