import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipeObj: any;
  beforeEach(() => {
    pipeObj = new StrengthPipe();
  });
  it('create an instance', () => {
    expect(pipeObj).toBeTruthy();
  });
  it('should return weak when 5 is passed', () => {
    expect(pipeObj.transform(5)).toBe('5 (weak)');
  });
  it('should return strong when 15 is passed', () => {
    expect(pipeObj.transform(15)).toBe('15 (strong)');
  });
  it('should return strongest when 25 is passed', () => {
    expect(pipeObj.transform(25)).toBe('25 (strongest)');
  });
});
