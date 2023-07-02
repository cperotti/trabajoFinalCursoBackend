/*import MessageManagerMongo from "../dao/mongo/message.mongo.js";

export const messageService = new MessageManagerMongo();*/

import { MessageDao } from "../dao/factory.js";

export const messageService = MessageDao;