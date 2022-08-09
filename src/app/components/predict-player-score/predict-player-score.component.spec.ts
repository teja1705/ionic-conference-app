import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredictPlayerScoreComponent } from './predict-player-score.component';

describe('PredictPlayerScoreComponent', () => {
  let component: PredictPlayerScoreComponent;
  let fixture: ComponentFixture<PredictPlayerScoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictPlayerScoreComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredictPlayerScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
