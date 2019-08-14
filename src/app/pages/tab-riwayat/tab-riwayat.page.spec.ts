import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRiwayatPage } from './tab-riwayat.page';

describe('TabRiwayatPage', () => {
  let component: TabRiwayatPage;
  let fixture: ComponentFixture<TabRiwayatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRiwayatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRiwayatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
