import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {AppModule} from "./app.module";
import {MatButtonHarness} from '@angular/material/button/testing';

let loader: HarnessLoader;

describe('AppComponent', () => {
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //   }).compileComponents();
  // });
  //
  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });
  //
  // it(`should have as title 'draughts-ui'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('draughts-ui');
  // });
  //
  // it('should render start game button', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('Start game');
  // });
  describe('my-component', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({imports: [AppModule], declarations: [AppComponent]})
        .compileComponents();
      let fixture = TestBed.createComponent(AppComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should display a start game button', async () => {
      const startGameButton = await loader.getHarness(MatButtonHarness.with({selector: '#start-game'}));
      expect(startGameButton).toBeDefined();
      expect(await startGameButton.getText()).toEqual("Start game")
    });
  })
});
