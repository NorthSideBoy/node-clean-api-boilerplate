import { UserRole } from "../enums/user.enum";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements UserProps {
  constructor(
    private readonly props: {
      id?: string;
      name: string;
      email: string;
      password: string;
      role: UserRole;
      status?:boolean;
      createdAt?: Date;
      updatedAt?: Date;
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
  get status(): boolean |undefined {
    return this.props.status
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
  toComplete(): Required<UserProps> {
    if (
      !this.id ||
      !this.name ||
      !this.email ||
      !this.password ||
      !this.role ||
      !this.status ||
      !this.createdAt ||
      !this.updatedAt
    )
      throw new Error("Incomplete User instance");

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
