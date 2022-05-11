import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

   createGameForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createGameForm = this.formBuilder.group({
      playerName : ['',Validators.required],
      piecesColor : ['',Validators.required]
    });
  }


  ngOnInit(): void {

  }

  onCreateAGame() {
    console.log('formValue => ',this.createGameForm.value);
  }
}
