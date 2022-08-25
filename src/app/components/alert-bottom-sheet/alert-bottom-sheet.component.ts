import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-bottom-sheet',
  templateUrl: './alert-bottom-sheet.component.html',
  styleUrls: ['./alert-bottom-sheet.component.scss'],
})
export class AlertBottomSheetComponent implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  back() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
