import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameComponent } from './create-game.component';
import {HomeModule} from "../home.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HomeViewComponent} from "../home-view/home-view.component";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatButtonHarness} from "@angular/material/button/testing";
import {MatFormFieldHarness} from "@angular/material/form-field/testing";
import {MatRadioGroupHarness} from "@angular/material/radio/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
    //expect(await createGameButton.getText()).toEqual(fixture.componentInstance.createButtonLabel)
  });

  it('should display a player name text input field', async () => {
    const usernameFormFiled = await loader.getHarness(MatFormFieldHarness.with({selector: '#input-player-name'}));
    expect(usernameFormFiled).toBeDefined();
    //expect(await usernameFormFiled.getLabel()).toEqual(fixture.componentInstance.playerNameLabel)
  });

  it('should display a radioGroup to choose pieces color', async () => {
    const colorRadioGroup = await loader.getHarness(MatRadioGroupHarness.with({selector: '#radio-group-pieces-color'}));
    expect(colorRadioGroup).toBeDefined();

    const radioButtons = await colorRadioGroup.getRadioButtons();
    expect(radioButtons).toBeDefined();
    expect(radioButtons.length).toEqual(2);
  });
});
