import { generate } from 'generate-password';
import * as moment from 'moment';
import { Payment } from '@common/enums/payment.enum';

export class Helper {
  /**
   *
   * Calculate date
   *
   * @param period hours
   * @returns date Date
   *
   */
  static calculateDate(period: number) {
    const today = new Date();
    return new Date(today.getTime() + 24 * 2.5 * period * 60 * 1000);
  }

  /**
   *
   * Generate password
   *
   * @param number length
   * @param boolean hasNum
   * @returns Promise<string> password
   *
   */
  static async generatePassword(length: number, hasNum: boolean): Promise<string> {
    return await generate({ length: length, numbers: hasNum });
  }

  /**
   *
   * Generate refresh code
   *
   * @returns number code
   *
   */
  static generateRefreshCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  /**
   * 
   * Generate expires Time
   * 
   * @param days number
   * @returns Date
   * 
   */
  static getExpiresTime(days: number): Date {
    const today = new Date();
    return new Date(today.getTime() + 24 * 60 * 60 * 1000 * days);
  }

  /**
   *  Generate random name
   * 
   * @returns name string
   * 
   */
  static generateRandomName(): string {
    return "";
  }

  /**
   * 
   * Generate random Online
   * 
   */
  static async generateRandomOnline(max: number, min: number): Promise<number> {
    return await Math.floor(min + Math.random() * (max - min + 1));
  }
}