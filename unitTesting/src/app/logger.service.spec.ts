import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: any;

  beforeEach(() => {
    loggerService = new LoggerService();
  });

  it('should not have any messages in array', () => {
    expect(loggerService.messages.length).toBe(0);
  });

  it('should add message when is log is called', () => {
    loggerService.log('message');
    expect(loggerService.messages.length).toBe(1);
  });

  it('should clear all messages when clear is called', () => {
    loggerService.log('message');
    loggerService.clear();
    expect(loggerService.messages.length).toBe(0);
  });
});
