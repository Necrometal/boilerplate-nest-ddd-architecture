import { ValueObject } from 'src/shared/domain/value-object';

export class Email extends ValueObject<{ value: string }> {
  // TODO setup validation
  static fromString(value: string): Email {
    return new Email({ value });
  }
}
