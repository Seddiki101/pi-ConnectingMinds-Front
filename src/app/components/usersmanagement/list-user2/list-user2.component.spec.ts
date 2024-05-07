import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUser2Component } from './list-user2.component';

describe('ListUser2Component', () => {
  let component: ListUser2Component;
  let fixture: ComponentFixture<ListUser2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUser2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUser2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
