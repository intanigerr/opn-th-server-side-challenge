import { RequestHandler } from "express";
import {
  UpdatePasswordDto,
  UpdateUserDto,
  UserResponseDto,
} from "../dto/interface";
import { User } from "../entity/user";

export type Local = { accessToken: string; user: User };

export interface IUserHandler {
  getCurrentUserInfo: RequestHandler<
    {},
    UserResponseDto,
    undefined,
    undefined,
    Local
  >;

  updateCurrentUserInfo: RequestHandler<
    {},
    UserResponseDto,
    UpdateUserDto,
    undefined,
    Local
  >;

  deleteUser: RequestHandler<{}, undefined, undefined, undefined, Local>;

  updatePassword: RequestHandler<
    {},
    undefined,
    UpdatePasswordDto,
    undefined,
    Local
  >;
}
