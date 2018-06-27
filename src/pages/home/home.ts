import { Component } from '@angular/core';
import { DetailPage } from '../detail/detail';
import { NavController, AlertController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: AngularFireList<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public afDatabase: AngularFireDatabase) {
    this.items = afDatabase.list('/packages').valueChanges();
  }

  itemSelected(item) {
    this.navCtrl.push(DetailPage, {
      item: item
    })
  }

  addPackage() {
    let prompt = this.alertCtrl.create({
      title: 'Package Name',
      message: "What is being delivered?",
      inputs: [
        {
          name: 'title',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newItemRef = this.items.push({ name: 'test' });
            
          }
        }
      ]
    });
    prompt.present();
  }

}

