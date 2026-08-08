import { Module } from '@nestjs/common';
import { IdentityModule } from 'src/context/identity/identity.module';
import { APP_FILTER } from '@nestjs/core';
import { DomainErrorFilter } from '../filters/domain-error.filter';

@Module({
  imports: [IdentityModule],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}
