import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Item, Task } from 'src/app/models/task.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
@Component({
  standalone: false,
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent  implements OnInit {

  @Input() task: Task
  user = {} as User

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    private utilsScv: UtilsService,
    private firebaseSvc: FirebaseService
  ) { }

  ngOnInit() {
    this.user = this.utilsScv.getElementFromLocalStorage('user');
    if(this.task){
      this.form.setValue(this.task);
      this.form.updateValueAndValidity()

    }
  }

  getPercentage(){
    return this.utilsScv.getPercentage(this.form.value as Task)
  }

  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {

    this.form.value.items = event.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();

  }

  remoItem(index: number){
    this.form.value.items.splice(index, 1);
    this.form.updateValueAndValidity();
  }

  createItem(){
    this.utilsScv.presentAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false,
      inputs:[
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo...',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Agregar',
          handler: (res) => {


            let item: Item = {name: res.name, completed: false};
            this.form.value.items.push(item)
          }
        }
      ]
    })
  }

}
