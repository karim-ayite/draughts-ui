import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formFields, messages} from "../../../shared/app.properties";
import {NewGame} from "../../../shared/model/game.model";
import {piecesColor} from "../../../shared/model/pieces-color.model";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  createGameForm: FormGroup;
  maxPlayerNameLenght = 25;
  messages = messages;

  @Output()
  createGameEvent = new EventEmitter<NewGame>();

  piecesColors = piecesColor;

  constructor(private formBuilder: FormBuilder) {
    this.createGameForm = this.formBuilder.group({
      playerName : ['',Validators.required],
      piecesColor : ['',Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onClickCreateAGame() {
    this.piecesColorControl.markAsTouched();
    if (this.createGameForm.valid) {
      let newGame = {} as NewGame;
      newGame.piecesColor = this.piecesColorControl.value;
      newGame.playerName = this.playerNameControl.value;
      this.createGameEvent.emit(newGame);
    }
  }

  getPlayerNameErrorMessage() {
    return this.playerNameControl.hasError('required') ? 'Player name is required' : '';
  }

  getPiecesColorErrorMessage() {
    return this.piecesColorControl.touched && this.piecesColorControl.hasError('required') ? 'Pieces color choice is required' : '';
  }

  get playerNameControl(){
    return this.createGameForm.controls[formFields.playerName];
  }

  get piecesColorControl(){
    return this.createGameForm.controls[formFields.piecesColor];
  }

  getHintLabel() {
    return messages.hintMaxChar(this.maxPlayerNameLenght);
  }
}
