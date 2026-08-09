import { Logger } from '@nestjs/common';
import { Email } from 'src/context/identity/domain/user/email.vo';
import { UserIdentifier } from 'src/context/identity/domain/user/user.identifier';
import { UserRegisteredEvent } from 'src/context/identity/domain/events/user-registered.event';
import { SendWelcomeEmailHandler } from './send-welcome-email.handler';

describe('SendWelcomeEmailHandler', () => {
  it('logs the recipient email when a user registers', () => {
    const handler = new SendWelcomeEmailHandler();
    const logSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    const event = new UserRegisteredEvent(
      UserIdentifier.generate(),
      new Date(),
      Email.fromString('user@example.com'),
    );

    handler.handle(event);

    expect(logSpy).toHaveBeenCalledWith(
      'Would send welcome email to user@example.com',
    );

    logSpy.mockRestore();
  });
});
