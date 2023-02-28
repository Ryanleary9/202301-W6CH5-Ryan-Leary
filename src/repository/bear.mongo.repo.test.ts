import { BearMongoRepo } from './bear.mongo.repo';
import { BearModel } from './bear.mongo.models';

jest.mock('./bear.mongo.models');

describe('Given BearMongoRepo', () => {
  const repo = new BearMongoRepo();
  describe('When is called', () => {
    test('Then should be instanced', () => {
      expect(repo).toBeInstanceOf(BearMongoRepo);
    });
  });

  describe('When i use readAll', () => {
    test('Then should return the data', async () => {
      (BearModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.readAll();

      expect(BearModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When i use ReadId', () => {
    test('Then should return the data', async () => {
      (BearModel.findById as jest.Mock).mockResolvedValue({ id: '1' });

      const id = '1';
      const result = await repo.readID(id);
      expect(BearModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When i use create', () => {
    test('Then it should return an object if we give a valid id', async () => {
      (BearModel.create as jest.Mock).mockResolvedValue([]);
      const newBear = {
        name: 'test',
        height: '200 cm',
        type: 'Black bear',
        weight: '300 kg',
      };
      const result = await repo.write(newBear);
      expect(result).toStrictEqual(newBear);
    });
  });

  describe('When i use update', () => {
    test('Then it should return the updated object if it has the same id', async () => {
      (BearModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'Pepe',
        height: '200 cm',
        type: 'Black bear',
        weight: '300 kg',
      });
      const result = await repo.update({
        id: '1',
        name: 'Pepe',
        height: '200 cm',
        type: 'Black bear',
        weight: '300 kg',
      });
      expect(BearModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toStrictEqual({
        id: '1',
        name: 'Pepe',
        height: '200 cm',
        type: 'Black bear',
        weight: '300 kg',
      });
    });

    test('When given a incorrect data it should thrown an erro', async () => {
      (BearModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        '[{"id": "1"}]'
      );
      const id = '1';
      const result = await repo.delete(id);
      expect(BearModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
