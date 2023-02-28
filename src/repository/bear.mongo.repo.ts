import { Bear } from '../entities/bear.model';
import { Repo } from './repo.interface';
import { BearModel } from './bear.mongo.models.js';
import { HTTPError } from '../errors/errors.js';

export class BearMongoRepo implements Repo<Bear> {
  async readAll(): Promise<Bear[]> {
    const data = await BearModel.find();
    return data;
  }

  async readID(id: string): Promise<Bear> {
    const data = await BearModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in ReadID ');
    return data;
  }

  async write(info: Partial<Bear>): Promise<Bear> {
    const data = await BearModel.create(info);
    return data;
  }

  async update(info: Partial<Bear>): Promise<Bear> {
    const data = await BearModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(402, 'Not possible', 'Update was not possible ');
    return data;
  }

  async delete(id: string): Promise<void> {
    const data = await BearModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(402, 'Not possible', 'Delete was not possible ');
  }
}
