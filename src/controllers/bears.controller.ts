import { Response, Request, NextFunction } from 'express';
import { BearsFileRepo } from '../repository/bears.file.repo.js';
import { Bear } from '../entities/bear.model.js';
import { Repo } from '../repository/repo.interface.js';
export class BearController {
  // eslint-disable-next-line no-useless-constructor
  constructor(public repo: Repo<Bear>) {}

  async readAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.readAll();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async readID(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.readID(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async write(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.write(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      this.repo.delete(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
