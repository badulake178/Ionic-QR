import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

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
        { name: 'Actividad 2', completed: false},
        { name: 'Actividad 3', completed: false}
      ]

    },
    {
      id: "3",
      title: 'Autenticacion con google',
      description: 'Esta es una tarea de autenticacion con google',
      items: [
        { name: 'Actividad 1', completed: true},
        { name: 'Actividad 2', completed: false},
        { name: 'Actividad 3', completed: false}
      ]

    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
