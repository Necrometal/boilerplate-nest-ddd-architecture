import { Module } from '@nestjs/common';
import { SendWelcomeEmailHandler } from './application/event-handlers/send-welcome-email.handler';

@Module({
  providers: [SendWelcomeEmailHandler],
})
export class NotificationsModule {}
