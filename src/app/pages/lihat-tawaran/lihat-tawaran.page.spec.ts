import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LihatTawaranPage } from './lihat-tawaran.page';

describe('LihatTawaranPage', () => {
  let component: LihatTawaranPage;
  let fixture: ComponentFixture<LihatTawaranPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LihatTawaranPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LihatTawaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
