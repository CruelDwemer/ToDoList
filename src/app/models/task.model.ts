import {TaskStatusEnum, TaskImportanceEnum} from "../../core";

export class TaskModel {
   public title: string;
   public status: TaskStatusEnum;
   public description: string;
   public importance: TaskImportanceEnum;
   public date: Date;
   
   public constructor(public id: number) {
       this.setActive();
       this.setRegular();       
   }
   
   public get dateDmy() {
       if (!this.date) {
           return null;
        }
       const d = this.date.getDate();
       const m = this.date.getMonth()+1;       
       return `${this.date.getFullYear()}-${m<10?'0'+m:m}-${d<10?'0'+d:d}`;
   }
   public get time() {
       if (!this.date) {
           return null;          
        }
       const h = this.date.getHours();
       const m = this.date.getMinutes();
       return `${h<10?'0'+h:h}:${m<10?'0'+m:m}`;
   }
   public get isExpired() {
       return this.date < new Date();
   }
   
   public get isDone() {
       return this.status === TaskStatusEnum.Done;
   }
   
   public get isActive() {
       return this.status === TaskStatusEnum.Active;
   }
   
   public get isExtraImportant() {
       return this.importance === TaskImportanceEnum.ExtraImportant;
   }
   
   public get isImportant() {
       return this.importance === TaskImportanceEnum.Important;
   }
   
   public get isRegular() {
       return this.importance === TaskImportanceEnum.Regular;
   }
   public setDone() {
       this.status = TaskStatusEnum.Done;
   }
   public setExpired() {
       this.status = TaskStatusEnum.Expired;
   }
   public setActive() {
       this.status = TaskStatusEnum.Active;
   }
   public setExtraImportant() {
        this.importance = TaskImportanceEnum.ExtraImportant;
   }
   public setImportant() {
        this.importance = TaskImportanceEnum.Important;
   }
   public setRegular() {
        this.importance = TaskImportanceEnum.Regular;
   }
}