import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
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

  tasks: Task[] = []

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService) {}

  ngOnInit() { }

  ionViewWillEnter(){
    this.getTasks()
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

  getTasks(){
    let user:User = this.utilsSvc.getElementFromLocalStorage('user');
    //console.log(user);

    let path = `users/${user.id}`
    let sub = this.firebaseSvc.getSubcollection(path, 'tasks').subscribe(
      {
        next: (res: Task[])=> {
        console.log(res);
        this.tasks = res
        sub.unsubscribe();
      },
      error: (err) => {
        console.error(err);
      }
    }

    );
  }

}
