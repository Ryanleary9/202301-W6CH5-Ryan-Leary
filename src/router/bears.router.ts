import { Router } from 'express';
import { BearsController } from '../controllers/bears.controller.js';
import { BearsFileRepo } from '../repository/bears.file.repo.js';

// eslint-disable-next-line new-cap
export const bearsRouter = Router();
const repo = new BearsFileRepo();
const controller = new BearsController(repo);

bearsRouter.get('/', controller.readAll.bind(controller));
bearsRouter.get('/:id', controller.readID.bind(controller));
bearsRouter.post('/', controller.write.bind(controller));
bearsRouter.patch('/:id', controller.update.bind(controller));
bearsRouter.delete('/:id', controller.delete.bind(controller));
