import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameComponent } from './create-game.component';
import {HomeModule} from "../home.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatButtonHarness} from "@angular/material/button/testing";
import {MatFormFieldHarness} from "@angular/material/form-field/testing";
import {MatRadioGroupHarness} from "@angular/material/radio/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {formFields, messages} from "../../../shared/app.properties";
import {NewGame} from "../../../shared/model/game.model";

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;
  let loader: HarnessLoader;


  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [HomeModule,NoopAnimationsModule,ReactiveFormsModule], declarations: [CreateGameComponent]})
      .compileComponents();
    fixture = TestBed.createComponent(CreateGameComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a create game button', async () => {
    const createGameButton = await loader.getHarness(MatButtonHarness.with({selector: '#button-create-game'}));
    expect(createGameButton).toBeDefined();
    expect(await createGameButton.getText()).toEqual(messages.createGame);
  });

  it('should display a player name text input field', async () => {
    const usernameFormFiled = await loader.getHarness(MatFormFieldHarness.with({selector: '#input-player-name'}));
    expect(usernameFormFiled).toBeDefined();
    expect(await usernameFormFiled.getLabel()).toEqual(messages.enterPlayerName+' *');
  });

  it('should display a radioGroup to choose pieces color', async () => {
    const colorRadioGroup = await loader.getHarness(MatRadioGroupHarness.with({selector: '#radio-group-pieces-color'}));
    expect(colorRadioGroup).toBeDefined();
    let radioButtons = await colorRadioGroup.getRadioButtons();
    expect(radioButtons.length).toEqual(2);

    const darkRadioButton = await colorRadioGroup.getRadioButtons({label: messages.dark});
    expect(darkRadioButton).toBeDefined();
    expect(darkRadioButton.length).toEqual(1);

    const lightRadioButton = await colorRadioGroup.getRadioButtons({label: messages.light});
    expect(lightRadioButton).toBeDefined();
    expect(lightRadioButton.length).toEqual(1);

  });

  it('should display form validation errors when form values are not set', async () => {
    const createGameButton = await loader.getHarness(MatButtonHarness.with({selector: '#button-create-game'}));
    await createGameButton.click();
    expect(component.getPiecesColorErrorMessage()).toEqual(messages.required('Pieces color choice'));
    expect(component.getPlayerNameErrorMessage()).toEqual(messages.required('Player name'));
  });

  it('should emit createGameEvent when click on create game button and form is valid', async () => {
    const createGameButton = await loader.getHarness(MatButtonHarness.with({selector: '#button-create-game'}));
    component.createGameForm.controls[formFields.playerName].setValue('player1');
    component.createGameForm.controls[formFields.piecesColor].setValue('0');
    const eventSpy = spyOn(component.createGameEvent,'emit');

    await createGameButton.click();

    expect(component.getPiecesColorErrorMessage()).toEqual('');
    expect(component.getPlayerNameErrorMessage()).toEqual('');

    let newGame = {} as NewGame;
    newGame.piecesColor = component.piecesColorControl.value;
    newGame.playerName = component.playerNameControl.value;

    expect(eventSpy).toHaveBeenCalledOnceWith(newGame);
  });

  it('should not emit createGameEvent when for is not valid', async () => {
    const createGameButton = await loader.getHarness(MatButtonHarness.with({selector: '#button-create-game'}));
    component.createGameForm.controls[formFields.playerName].setValue('player1');

    const eventSpy = spyOn(component.createGameEvent,'emit');

    await createGameButton.click();

    expect(eventSpy).not.toHaveBeenCalled();
  });


});
