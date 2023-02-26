import { Response, Request } from 'express';
import { Bear, BearsFileRepo } from '../repository/bears.file.repo.js';

export class BearsController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: BearsFileRepo) {}

  readAll(_req: Request, resp: Response) {
    this.repo.readAll().then((data) => {
      resp.json(data);
    });
  }

  readID(req: Request, resp: Response) {
    this.repo
      .readID(Number(req.params.id))
      .then((data) =>
        data === undefined
          ? resp.send('<p>No elements found with the request id</p>')
          : resp.json(data)
      );
  }

  write(req: Request, resp: Response) {
    console.log(req.body);
    this.repo.write(req.body).then();
    resp.send('<h1>Write Successfull</h1>');
  }

  async update(req: Request, resp: Response) {
    const updateInfo = req.body as Partial<Bear>;
    const updateData = await this.repo.readID(Number(req.params.id));
    const itemUpdate = Object.assign(updateData, updateInfo);
    console.log(itemUpdate);
    await this.repo.update(itemUpdate);
    console.log('Data update: ' + itemUpdate);
    resp.send('<h1>Update Sucessfull</h1>');
  }

  async delete(req: Request, resp: Response) {
    await this.repo.delete(Number(req.params.id));
    resp.send(
      `<h1>Bear with id: ${req.params.id} has been deleted sucessfully</h1>`
    );
  }
}
