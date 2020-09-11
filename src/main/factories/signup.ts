import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { IController } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';

export const makeSignUpController = (): IController => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  return new LogControllerDecorator(signUpController);
};