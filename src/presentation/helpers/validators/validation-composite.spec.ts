import { MissingParamError } from '../../errors';
import { Validation } from './validation';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('Shuld return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate(input: any): Error {
        return new MissingParamError('field');
      }
    }
    const validationStub = new ValidationStub();
    const sut = new ValidationComposite([validationStub]);
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  // test('Shuld not return if validation succeeds', () => {
  //   const sut = makeSut();
  //   const error = sut.validate({ field: 'any_name' });
  //   expect(error).toBeFalsy();
  // });
});
