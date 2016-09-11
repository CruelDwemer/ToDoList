import { Injectable } from '@angular/core';
import { TaskModel } from '../models';

@Injectable()
export class TaskDataService {
  public tasks: TaskModel[] = [];
  
  public constructor() {
      const restoredTasks = localStorage.getItem('todo:tasks');
      if (restoredTasks) {
          const parsedTasks = JSON.parse(restoredTasks);
          this.tasks = new Array(parsedTasks.length);
          for (let i = 0, len = parsedTasks.length; i < len; i++) {
              const parsed = parsedTasks[i];
              const task = new TaskModel(parsed.id);
              task.title = parsed.title;
              task.status = parsed.status;
              task.description = parsed.description;
              task.importance = parsed.importance;
              task.date = new Date(parsed.date);
              this.tasks[i] = task;
          }
      }
  }
  
  public create() {
      const task = new TaskModel(this.tasks.length);
      this.tasks.push(task);      
      return task;    
  }
  
  public save(task: TaskModel) {
      Object.assign(this.getTask(task.id), task);
      localStorage.setItem('todo:tasks', JSON.stringify(this.tasks));   
  }
  public getTask(id: number) {
      return this.tasks.find(task => task.id === id);
  }
  public getExtraImportant() {
      return this.tasks.filter(task => task.isExtraImportant);
  }
  public getImportant() {
      return this.tasks.filter(task => task.isImportant);
  }
  public getRegular() {
      return this.tasks.filter(task => task.isRegular);
}
  public getAll() {
      return this.tasks;
  }
  public delete(task: TaskModel) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      localStorage.setItem('todo:tasks', JSON.stringify(this.tasks));
      return this.tasks;     
  }
  public hasTask(task:TaskModel) {
      return this.tasks.indexOf(task) !== -1;
  }
}