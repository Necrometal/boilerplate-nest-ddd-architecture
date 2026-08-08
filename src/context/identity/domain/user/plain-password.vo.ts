import { ValueObject } from 'src/shared/domain/value-object';

export class PlainPassword extends ValueObject<{ value: string }> {
  // TODO setup validation
  static fromString(value: string): PlainPassword {
    return new PlainPassword({ value });
  }

  toString(): string {
    return this.props.value;
  }
}
