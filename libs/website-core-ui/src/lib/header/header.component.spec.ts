import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {ImageService} from "@cardsort-softwares/firebase-services";
import {AutoMocker} from "@cardsort-softwares/auto-mocker";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let imageServiceMock: ImageService;
  const autoMocker = new AutoMocker();

  beforeEach(async () => {
    imageServiceMock = autoMocker.mockClass(ImageService);
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{
        provide: ImageService,
        useValue: imageServiceMock
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    autoMocker.withReturnObservable(imageServiceMock.getImage$, null);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
