import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrimgPage } from './qrimg.page';

describe('QrimgPage', () => {
  let component: QrimgPage;
  let fixture: ComponentFixture<QrimgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrimgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
