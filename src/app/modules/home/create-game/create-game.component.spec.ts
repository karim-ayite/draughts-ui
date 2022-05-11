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

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [HomeModule,NoopAnimationsModule], declarations: [HomeViewComponent]})
      .compileComponents();
    fixture = TestBed.createComponent(CreateGameComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should display a create game button', async () => {
    const createGameButton = await loader.getHarness(MatButtonHarness.with({selector: '#create-game-button'}));
    expect(createGameButton).toBeDefined();
    //expect(await createGameButton.getText()).toEqual(fixture.componentInstance.createButtonLabel)
  });

  it('should display a username text input field', async () => {
    const usernameFormFiled = await loader.getHarness(MatFormFieldHarness.with({selector: '#username-input-field'}));
    expect(usernameFormFiled).toBeDefined();
    //expect(await usernameFormFiled.getLabel()).toEqual(fixture.componentInstance.playerNameLabel)
  });

  it('should display a radioGroup to choose color', async () => {
    const colorRadioGroup = await loader.getHarness(MatRadioGroupHarness.with({selector: '#radio-group-color-field'}));
    expect(colorRadioGroup).toBeDefined();

    const radioButtons = await colorRadioGroup.getRadioButtons();
    expect(radioButtons).toBeDefined();
    expect(radioButtons.length).toEqual(2);
  });
});
