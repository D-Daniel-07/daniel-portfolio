import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollStack } from './scroll-stack';

describe('ScrollStack', () => {
  let component: ScrollStack;
  let fixture: ComponentFixture<ScrollStack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollStack],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollStack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
