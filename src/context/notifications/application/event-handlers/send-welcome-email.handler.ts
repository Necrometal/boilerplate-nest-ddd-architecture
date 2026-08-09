import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from 'src/context/identity/domain/events/user-registered.event';

// Stub: proves a context other than identity can react to identity's
// events with zero coupling beyond the event class itself (no shared
// publisher instance, no module import of IdentityModule). Replace the
// log line with a real mail adapter call when one exists.
@Injectable()
export class SendWelcomeEmailHandler {
  private readonly logger = new Logger(SendWelcomeEmailHandler.name);

  @OnEvent('UserRegisteredEvent')
  handle(event: UserRegisteredEvent): void {
    this.logger.log(`Would send welcome email to ${event.email.toString()}`);
  }
}
