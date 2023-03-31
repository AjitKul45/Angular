import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let mockLogger: any;
  let service: any;

  beforeEach(() => {
    console.log('in beforeEach');
    mockLogger = jasmine.createSpyObj('LoggerService', ['log']);
    service = new CalculatorService(mockLogger);
  });

  it('it should add two numbers', () => {
    console.log('in adding two numbers');

    //spyOn(logger, 'log') will not called the method in the service
    //spyOn(logger, 'log').and.callThrough() will call the method in the service
    // spyOn(mockLogger, 'log');

    let result = service.add(2, 3);
    expect(result).toBe(5);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
  });

  it('it should subtract two numbers', () => {
    console.log('in subtracting two numbers');

    // // let logger = new LoggerService();
    // // const service = new CalculatorService(logger);
    // let mockLogger = jasmine.createSpyObj('LoggerService', ['log']);
    // const service = new CalculatorService(mockLogger);

    // spyOn(mockLogger, 'log');

    let result = service.sub(2, 3);
    expect(result).toBe(-1);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
  });
});
