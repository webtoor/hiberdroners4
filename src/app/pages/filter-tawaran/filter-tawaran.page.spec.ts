import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTawaranPage } from './filter-tawaran.page';

describe('FilterTawaranPage', () => {
  let component: FilterTawaranPage;
  let fixture: ComponentFixture<FilterTawaranPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTawaranPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTawaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
