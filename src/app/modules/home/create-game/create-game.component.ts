import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  createGameForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createGameForm = this.formBuilder.group({
      playerName : ['',Validators.required],
      piecesColor : ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onClickCreateAGame() {
    console.log('formValue => ',this.createGameForm.value);
  }

  getPlayerNameErrorMessage() {
    return this.playerNameControl.hasError('required') ? 'Player name is required' : '';
  }

  getPiecesColorErrorMessage() {
    return this.piecesColorControl.hasError('required') ? 'Pieces color choice is required' : '';
  }

  get playerNameControl(){
    return this.createGameForm.controls['playerName'];
  }

  get piecesColorControl(){
    return this.createGameForm.controls['piecesColor'];
  }

}
