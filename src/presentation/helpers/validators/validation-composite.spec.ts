import { MissingParamError } from '../../errors';
import { Validation } from './validation';
import { ValidationComposite } from './validation-composite';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

interface SutTypes{
  sut: ValidationComposite,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const sut = new ValidationComposite([validationStub]);
  return {
    sut,
    validationStub
  };
};

describe('ValidationComposite', () => {
  test('Shuld return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  // test('Shuld not return if validation succeeds', () => {
  //   const sut = makeSut();
  //   const error = sut.validate({ field: 'any_name' });
  //   expect(error).toBeFalsy();
  // });
});
