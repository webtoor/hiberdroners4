import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LihatBerjalanPage } from './lihat-berjalan.page';

describe('LihatBerjalanPage', () => {
  let component: LihatBerjalanPage;
  let fixture: ComponentFixture<LihatBerjalanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LihatBerjalanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LihatBerjalanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
