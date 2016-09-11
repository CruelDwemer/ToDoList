import { Component, Inject, OnInit, SimpleChange, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TaskImportanceEnum } from '../../core';
import { TaskModel } from '../models';
import { TaskDataService } from '../services';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    public model: TaskModel;
    private sub: Subscription;
    private taskForm: FormGroup;
    private origin: TaskModel;
    private type: string;
    
    public constructor(
      @Inject(TaskDataService) private taskDataService: TaskDataService,
      @Inject(Router) private router: Router,
      @Inject(ActivatedRoute) private route: ActivatedRoute,
      @Inject(FormBuilder) private formBuilder: FormBuilder
    ) {}
    
    public get status() {
        if (this.model.isExpired) {
            return 'ПРОСРОЧЕНО';
        } else if (this.model.isDone) {
            return 'ВЫПОЛНЕНО';
        }else if (this.model.isActive) {
            return 'АКТИВНО';
        }
    }    
    public get importance() {
        if (this.model.isExtraImportant) {
            return 'ОЧЕНЬ ВАЖНОЕ';
        } else if (this.model.isImportant) {
            return 'ВАЖНОЕ';
        }else if (this.model.isRegular) {
            return 'ОБЫЧНОЕ';
        }
    }    
    public ngOnInit() {
        const restoredTask = localStorage.getItem('todo:current-task');
        if (restoredTask) {
            const parsed = JSON.parse(restoredTask);
            this.model = new TaskModel(parsed.id);
            this.model.title = parsed.title;
            this.model.status = parsed.status;
            this.model.description = parsed.description;
            this.model.importance = parsed.importance;
            this.model.date = new Date(parsed.date);
            this.type = localStorage.getItem('todo:current-type');             
        }    
                       
        this.sub = this.route.params.subscribe(params => {            
            const id = +params['id']; // (+) converts string 'id' to a number
            this.type = params['action'];            
            this.origin = this.taskDataService.getTask(id);
            this.model = Object.assign(Object.create(this.origin), this.origin);
            localStorage.setItem('todo:current-type', this.type);
                        

            this.taskForm = this.formBuilder.group({            
              title: this.model.title,
              description: this.model.description,
              date: this.model.dateDmy,
              time: this.model.time
            });
            
            this.taskForm.valueChanges.subscribe(value => {
              this.model.title = value.title;
              this.model.description = value.description;
              this.model.date = new Date(`${value.date} ${value.time}`);
              localStorage.setItem('todo:current-task', JSON.stringify(this.model));
            })
        });
      
         
    }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
    public setExtraImportant() {
        this.model.setExtraImportant();
    }
    public setImportant() {
        this.model.setImportant();
    }
    public setRegular() {
        this.model.setRegular();
    }
    public save() {
        this.taskDataService.save(this.model);
        this.router.navigate(['/tasks']);
    }
    public cancel() {
        if (this.type === 'new') {
            this.taskDataService.delete(this.origin);
        }
        this.router.navigate(['/tasks']);
    }
    public back() {
        this.cancel();               
    }
    public remove() {        
        this.taskDataService.delete(this.origin);
        this.router.navigate(['/tasks']);
        
    }
    
  
}