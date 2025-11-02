import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBar } from './settings-bar';

describe('SettingsBar', () => {
  let component: SettingsBar;
  let fixture: ComponentFixture<SettingsBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
