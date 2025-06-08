import { UserRole } from "../enums/user.enum";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  constructor(
    private readonly props: {
      id?: string;
      name: string;
      email: string;
      password: string;
      role: UserRole;
      createdAt: Date;
      updatedAt: Date;
    }
  ) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }
  get password(): string {
    return this.props.password;
  }
  get role(): UserRole {
    return this.props.role;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
