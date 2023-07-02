/*import CartManagerMongo from "../dao/mongo/cart.mongo.js";

export const cartService = new CartManagerMongo();*/

import { CartDao } from "../dao/factory.js";

export const cartService = CartDao;