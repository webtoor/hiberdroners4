import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIkutiPage } from './modal-ikuti.page';

describe('ModalIkutiPage', () => {
  let component: ModalIkutiPage;
  let fixture: ComponentFixture<ModalIkutiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIkutiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIkutiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
