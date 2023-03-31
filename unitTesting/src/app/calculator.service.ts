import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private logger: LoggerService) {}
  add(n1: number, n2: number) {
    let res = n1 + n2;
    this.logger.log('add operation is called');
    return res;
  }

  sub(n1: number, n2: number) {
    let res = n1 - n2;
    this.logger.log('sub operation is called');
    return res;
  }
}
