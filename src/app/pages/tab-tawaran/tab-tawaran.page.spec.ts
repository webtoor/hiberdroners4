import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTawaranPage } from './tab-tawaran.page';

describe('TabTawaranPage', () => {
  let component: TabTawaranPage;
  let fixture: ComponentFixture<TabTawaranPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTawaranPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTawaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
