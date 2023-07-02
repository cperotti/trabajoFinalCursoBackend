/*import UserManagerMongo from "../dao/mongo/user.mongo.js";

export const userService = new UserManagerMongo();*/

import { UserDao } from "../dao/factory.js";

export const userService = UserDao;