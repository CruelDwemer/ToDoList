import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './task-list';
import { TaskComponent } from './task'

const appRoutes: Routes = [
    {
      path: '',
      redirectTo: '/tasks',
      pathMatch: 'full'  
    },
    {
        path: 'tasks',    
        children: [
        {
            path: '',
            component: TaskListComponent
        },
        {
            path: ':id',
            component: TaskComponent
        }
        ]
    }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);