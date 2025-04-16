import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayBotComponent } from './essay-bot.component';

describe('EssayBotComponent', () => {
  let component: EssayBotComponent;
  let fixture: ComponentFixture<EssayBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EssayBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssayBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



