import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateUser } from './application/use-cases/authenticate-user';
import { PasswordHasher } from './application/ports/password-hasher';
import { RegisterUser } from './application/use-cases/register-user';
import { TokenIssuer } from './application/ports/token-issuer';
import { UserRepository } from './domain/ports/user.repository';
import { InMemoryUserRepository } from './infrastructure/persistence/in-memory-user.repository';
import { BcryptPasswordHasher } from './infrastructure/security/bcrypt-password-hasher';
import { JwtTokenIssuer } from './infrastructure/security/jwt-token-issuer';
import { IdentityController } from './interface/http/identity.controller';

@Module({
  // JWT_SECRET falls back to a dev-only literal so the app still boots
  // without env setup; a missing/weak secret in production is a deploy
  // config problem, not something to guard against here.
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [IdentityController],
  providers: [
    RegisterUser,
    AuthenticateUser,
    { provide: UserRepository, useClass: InMemoryUserRepository },
    { provide: PasswordHasher, useClass: BcryptPasswordHasher },
    { provide: TokenIssuer, useClass: JwtTokenIssuer },
  ],
})
export class IdentityModule {}
