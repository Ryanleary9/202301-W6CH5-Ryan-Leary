import { Router } from 'express';
import { BearController } from '../controllers/bears.controller.js';
import { BearMongoRepo } from '../repository/bear.mongo.repo.js';

// eslint-disable-next-line new-cap
export const bearsRouter = Router();
//  A const repo = new BearsFileRepo();
const repo = new BearMongoRepo();
const controller = new BearController(repo);

bearsRouter.get('/', controller.readAll.bind(controller));
bearsRouter.get('/:id', controller.readID.bind(controller));
bearsRouter.post('/', controller.write.bind(controller));
bearsRouter.patch('/:id', controller.update.bind(controller));
bearsRouter.delete('/:id', controller.delete.bind(controller));
