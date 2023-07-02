/*import ProductManagerMongo from "../dao/mongo/product.mongo.js";

export const productService = new ProductManagerMongo();*/

import { ProductDao } from "../dao/factory.js";

export const productService = ProductDao;