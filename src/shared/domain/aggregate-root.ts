import { DomainEvent } from './domain-event';
import { Entity } from './entity';
import { Identifier } from './identifier';

// An Entity that is also the consistency boundary + transaction root of a cluster
// of objects: outside code must go through the aggregate root, never reach into
// its internal entities/value objects directly.
export abstract class AggregateRoot<
  TProperties extends { id: Identifier },
> extends Entity<TProperties> {
  // Private field (#, not `protected`): even subclasses can't push/clear events directly,
  // only through the controlled `addDomainEvent` method below.
  #domainEvents: DomainEvent[] = [];

  protected constructor(props: TProperties) {
    super(props);
  }

  // Protected: only the aggregate's own business methods decide when a domain event fires,
  // never external application/infra code.
  protected addDomainEvent(event: DomainEvent): void {
    this.#domainEvents.push(event);
  }
}
