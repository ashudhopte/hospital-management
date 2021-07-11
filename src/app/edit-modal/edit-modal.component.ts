import { Component, Input, OnInit } from '@angular/core';
import { MPatientDtoC } from '../models';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  @Input() patient: MPatientDtoC = new MPatientDtoC()

  constructor() { }

  ngOnInit(): void {
  }

}
