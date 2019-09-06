import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LihatRiwayatPage } from './lihat-riwayat.page';

describe('LihatRiwayatPage', () => {
  let component: LihatRiwayatPage;
  let fixture: ComponentFixture<LihatRiwayatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LihatRiwayatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LihatRiwayatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
