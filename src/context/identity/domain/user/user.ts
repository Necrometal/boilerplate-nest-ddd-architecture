import { AggregateRoot } from 'src/shared/domain/aggregate-root';
import { Email } from './email.vo';
import { HashedPassword } from './hashed-password.vo';
import { UserStatus } from './user-status.enum';
import { UserIdentifier } from './user.identifier';

interface Properties {
  id: UserIdentifier;
  email: Email;
  password: HashedPassword;
  status: UserStatus;
}

/**
 * TODO
 * static factory create/register
 * build user
 */
export class User extends AggregateRoot<Properties> {
  getPassword(): HashedPassword {
    return this.props.password;
  }

  suspend() {
    this.props.status = UserStatus.suspended;
  }

  activate() {
    this.props.status = UserStatus.active;
  }

  delete() {
    this.props.status = UserStatus.deleted;
  }

  disable() {
    this.props.status = UserStatus.disabled;
  }
}
