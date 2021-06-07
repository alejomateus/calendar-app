import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it("should be setSpinnerText", () => {
    service.setSpinnerText("Hello");
    service.getSpinnerText();
    expect(service.spinnerText).toEqual("Hello");
    expect(service).toBeTruthy();
  });
});
