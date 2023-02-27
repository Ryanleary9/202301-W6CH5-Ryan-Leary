import { Bear } from '../entities/bear.model';
import { BearsFileRepo } from './bears.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');
describe('Given ThingsFileRepo', () => {
  // Arrange
  const repo = new BearsFileRepo();

  describe('t', () => {
    test('Then it should be instaced', () => {
      expect(repo).toBeInstanceOf(BearsFileRepo);
    });
  });

  describe('When i use query', () => {
    test('Then it should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.readAll();

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When i use queryId', () => {
    test('Then it should return an object if it has a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const id = '1';
      const result = await repo.readID(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then it should throw an error', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "2"}]');
      const id = '1';

      expect(async () => repo.readID(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When i use create', () => {
    test('Then it should return an object if we give a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const newBear: Bear = {
        id: '8',
        name: 'test',
        height: '200 cm',
        type: 'Black bear',
        weight: '300 kg',
      };
      const result = await repo.write(newBear);
      expect(result).toEqual(newBear);
    });
  });

  describe('When i use update', () => {
    test('Then it should return the updated object if it has the same id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "height": "200 cm", "type": "Black bear", "weight": "300 kg" }]'
      );
      const result = await repo.update({
        id: '1',
        name: 'test',
        height: '200 cm',
        type: 'Black bear',
        weight: '300 kg',
      });
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        name: 'test',
        height: '200 cm',
        type: 'Black bear',
        weight: '300 kg',
      });
    });
    test('Then it should throw an error if it has a NO valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "week": 3, "level": 2 }]'
      );
      expect(async () =>
        repo.update({
          id: '2',
          name: 'test',
          height: '200 cm',
          type: 'Black bear',
          weight: '300kg',
        })
      ).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });

    test('Then it should throw an error', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": "2", "name": "Chop", "height": "200 cm", "type": "Black Bear", "weight": "300 kg"}]'
      );
      const id: Partial<Bear> = {
        name: 'Chop',
        height: '200 cm',
        type: 'Black Bear',
        weight: '300kg',
      };

      expect(async () => repo.update(id)).rejects.toThrowError();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });

  describe('When use delete', () => {
    test('Then it should return an object if it has a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const id = '1';
      const result = await repo.delete(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
    test('Then it should throw an error if it has an invalid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": "2", "name": "Chop", "height": "200 cm", "type": "Black Bear", "weight": "300 kg"}]'
      );
      expect(async () => repo.delete('5')).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
});
