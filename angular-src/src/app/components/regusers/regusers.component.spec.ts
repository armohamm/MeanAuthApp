/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegusersComponent } from './regusers.component';

describe('RegusersComponent', () => {
  let component: RegusersComponent;
  let fixture: ComponentFixture<RegusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
