import { User } from "../entity/user";

export interface CreateUserDto extends User {}

export interface UpdateUserDto
  extends Partial<
    Pick<User, "dateOfBirth" | "gender" | "address" | "subscribeToNewsletter">
  > {}

export interface UserResponseDto extends Omit<User, "password"> {
  age: number;
}

export interface UpdatePasswordDto {
  password: string;
  newPassword: string;
}
