import { Response, Request, NextFunction } from 'express';

import { BearsFileRepo } from '../repository/bears.file.repo';
import { BearController } from './bears.controller';

describe('Given ThingsController', () => {
  const repo: BearsFileRepo = {
    write: jest.fn(),
    readAll: jest.fn(),
    readID: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new BearController(repo);

  describe('when we use getAll', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.readAll(req, resp, next);
      expect(repo.readAll).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.readAll as jest.Mock).mockRejectedValue(new Error());
      await controller.readAll(req, resp, next);
      expect(repo.readAll).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use get', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.readID(req, resp, next);
      expect(repo.readID).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.readID as jest.Mock).mockRejectedValue(new Error());
      await controller.readID(req, resp, next);
      expect(repo.readID).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use post', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.write(req, resp, next);
      expect(repo.write).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.write as jest.Mock).mockRejectedValue(new Error());
      await controller.write(req, resp, next);
      expect(repo.write).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use patch', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.update(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.update(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when we use delete', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should ... if there are errors', async () => {
      (repo.delete as jest.Mock).mockRejectedValue(new Error());
      expect(repo.delete).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
