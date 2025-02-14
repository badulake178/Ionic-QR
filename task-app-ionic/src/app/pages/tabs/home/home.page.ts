import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [
    {
      id: "1",
      title: 'Autenticacion con google',
      description: 'Esta es una tarea de autenticacion con google',
      items: [
        { name: 'Actividad 1', completed: true},
        { name: 'Actividad 2', completed: false},
        { name: 'Actividad 3', completed: false}
      ]

    },
    {
      id: "2",
      title: 'Autenticacion con google',
      description: 'Esta es una tarea de autenticacion con google',
      items: [
        { name: 'Actividad 1', completed: true},
        { name: 'Actividad 2', completed: true},
        { name: 'Actividad 3', completed: false}
      ]

    },
    {
      id: "3",
      title: 'Autenticacion con google',
      description: 'Esta es una tarea de autenticacion con google',
      items: [
        { name: 'Actividad 1', completed: true},
        { name: 'Actividad 2', completed: true},
        { name: 'Actividad 3', completed: true}
      ]

    },
  ]

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
    this.addOrUpdateTask(this.tasks[0])
  }

  getPercentage(task: Task){
    return this.utilsSvc.getPercentage(task)
  }

  addOrUpdateTask(task?: Task){
    this.utilsSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal',
    })

  }

}
