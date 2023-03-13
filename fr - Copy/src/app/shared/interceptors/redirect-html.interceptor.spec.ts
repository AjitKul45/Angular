import { TestBed } from '@angular/core/testing';

import { RedirectHtmlInterceptor } from './redirect-html.interceptor';

describe('RedirectHtmlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RedirectHtmlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RedirectHtmlInterceptor = TestBed.inject(RedirectHtmlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
