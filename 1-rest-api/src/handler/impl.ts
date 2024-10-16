import dayjs from "dayjs";
import { RequestHandler } from "express";
import {
  UpdatePasswordDto,
  UpdateUserDto,
  UserResponseDto,
} from "../dto/interface";
import { User } from "../entity/user";
import { IUserHandler, Local } from "./interface";

export class UserHandlerImpl implements IUserHandler {
  constructor(private store: Map<string, User>) {}
  updatePassword: RequestHandler<
    {},
    undefined,
    UpdatePasswordDto,
    undefined,
    Local
  > = (req, res) => {
    const { password, newPassword } = req.body;
    if (password !== res.locals.user.password) {
      res.status(400).end();
    } else {
      const updatedUser = { ...res.locals.user, password: newPassword };
      this.store.set(res.locals.accessToken, updatedUser);
      res.status(200).end();
    }
  };
  public deleteUser: RequestHandler<
    {},
    undefined,
    undefined,
    undefined,
    Local
  > = (req, res) => {
    this.store.delete(res.locals.accessToken);
    res.status(200).end();
  };

  public updateCurrentUserInfo: RequestHandler<
    {},
    UserResponseDto,
    UpdateUserDto,
    undefined,
    Local
  > = (req, res) => {
    const updatedUser: User = {
      ...res.locals.user,
      dateOfBirth: req.body.dateOfBirth ?? res.locals.user.dateOfBirth,
      gender: req.body.gender ?? res.locals.user.gender,
      address: req.body.address ?? res.locals.user.address,
      subscribeToNewsletter:
        req.body.subscribeToNewsletter ?? res.locals.user.subscribeToNewsletter,
    };

    this.store.set(res.locals.accessToken, updatedUser);
    res.status(200).end();
  };

  public getCurrentUserInfo: RequestHandler<
    {},
    UserResponseDto,
    undefined,
    undefined,
    Local
  > = (req, res) => {
    res
      .status(200)
      .json({
        ...res.locals.user,
        age: dayjs().diff(dayjs(res.locals.user.dateOfBirth), "year"),
      })
      .end();
  };
}
