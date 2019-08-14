import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBerjalanPage } from './tab-berjalan.page';

describe('TabBerjalanPage', () => {
  let component: TabBerjalanPage;
  let fixture: ComponentFixture<TabBerjalanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabBerjalanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBerjalanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
