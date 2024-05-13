import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMoedasComponent } from './lista-moedas.component';

describe('ListaMoedasComponent', () => {
  let component: ListaMoedasComponent;
  let fixture: ComponentFixture<ListaMoedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMoedasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
