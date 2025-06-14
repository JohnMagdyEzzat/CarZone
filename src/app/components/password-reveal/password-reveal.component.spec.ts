import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRevealComponent } from './password-reveal.component';

describe('PasswordRevealComponent', () => {
  let component: PasswordRevealComponent;
  let fixture: ComponentFixture<PasswordRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRevealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
