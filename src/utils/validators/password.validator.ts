import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    return regularExpression.test(password);
  }
}

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'Password',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PasswordValidator,
    });
  };
}
