import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { AnonymousGuard } from 'src/shared/guards/anonymous.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('../pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AnonymousGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },

  { path: 'project/tasks/:id', loadChildren: () => import('../pages/tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [AuthGuard]
  },

  { path: 'create-tasks/:projectId', loadChildren: () => import('../pages/tasks/create-tasks/create-tasks.module').then(m => m.CreateTasksModule), 
   canActivate: [AuthGuard]
  },

  { path: 'create-tasks/:projectId/:taskId', loadChildren: () => import('../pages/tasks/create-tasks/create-tasks.module').then(m => m.CreateTasksModule), 
   canActivate: [AuthGuard]
  },


  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
