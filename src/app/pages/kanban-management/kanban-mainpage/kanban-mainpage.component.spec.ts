import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanMainpageComponent } from './kanban-mainpage.component';

describe('KanbanMainpageComponent', () => {
  let component: KanbanMainpageComponent;
  let fixture: ComponentFixture<KanbanMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanMainpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
