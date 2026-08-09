import { DomainError } from 'src/shared/domain/domain-error';
import { UserRepository } from '../../domain/ports/user.repository';
import { Email } from '../../domain/user/email.vo';
import { HashedPassword } from '../../domain/user/hashed-password.vo';
import { User } from '../../domain/user/user';
import { UserIdentifier } from '../../domain/user/user.identifier';
import { PasswordHasher } from '../ports/password-hasher';
import { RegisterUser } from './register-user';

describe('RegisterUser', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let passwordHasher: jest.Mocked<PasswordHasher>;
  let useCase: RegisterUser;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
    };
    passwordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    useCase = new RegisterUser(userRepository, passwordHasher);
  });

  it('registers a new user and returns its id', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    passwordHasher.hash.mockResolvedValue(
      HashedPassword.fromString('$2b$10$fakehash'),
    );

    const result = await useCase.execute({
      email: 'user@example.com',
      password: 'abcd1234',
    });

    expect(result.userId).toEqual(expect.any(String));
    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledWith(expect.any(User));
  });

  it('hashes the plain password before saving', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    passwordHasher.hash.mockResolvedValue(
      HashedPassword.fromString('$2b$10$fakehash'),
    );

    await useCase.execute({ email: 'user@example.com', password: 'abcd1234' });

    const savedUser = userRepository.save.mock.calls[0][0];
    expect(savedUser.getPassword().toString()).toBe('$2b$10$fakehash');
  });

  it('rejects an invalid email before touching the repository', async () => {
    await expect(
      useCase.execute({ email: 'not-an-email', password: 'abcd1234' }),
    ).rejects.toThrow(DomainError);

    expect(userRepository.findByEmail).not.toHaveBeenCalled();
  });

  it('rejects a weak password before touching the repository', async () => {
    await expect(
      useCase.execute({ email: 'user@example.com', password: 'weak' }),
    ).rejects.toThrow(DomainError);

    expect(userRepository.findByEmail).not.toHaveBeenCalled();
  });

  it('rejects registration when the email is already taken', async () => {
    userRepository.findByEmail.mockResolvedValue(
      User.register(
        UserIdentifier.generate(),
        Email.fromString('user@example.com'),
        HashedPassword.fromString('$2b$10$fakehash'),
      ),
    );

    await expect(
      useCase.execute({ email: 'user@example.com', password: 'abcd1234' }),
    ).rejects.toThrow('Email already registered');

    expect(passwordHasher.hash).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
