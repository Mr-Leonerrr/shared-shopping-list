export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  groups?: number[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
