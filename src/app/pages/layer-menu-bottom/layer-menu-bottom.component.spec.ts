import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerMenuBottomComponent } from './layer-menu-bottom.component';

describe('LayerMenuBottomComponent', () => {
  let component: LayerMenuBottomComponent;
  let fixture: ComponentFixture<LayerMenuBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerMenuBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerMenuBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
