import { randomUUID } from 'crypto';

export abstract class Entity<T> {
  private _id: string;

  protected props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  public equals(entity: Entity<any>) {
    if (entity === this) return true;

    if (entity.id === this._id) return true;

    return false;
  }
}
