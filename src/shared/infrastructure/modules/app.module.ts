import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { IdentityModule } from 'src/context/identity/identity.module';
import { NotificationsModule } from 'src/context/notifications/notifications.module';
import { DomainErrorFilter } from '../filters/domain-error.filter';

@Module({
  // .forRoot() registers EventEmitter2 as a global provider: any context
  // module can inject it, or use `@OnEvent()`, without importing this module
  // itself — that's what lets a context listen to events published by any
  // other context without a direct dependency between them.
  imports: [EventEmitterModule.forRoot(), IdentityModule, NotificationsModule],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}
