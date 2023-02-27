import fs from 'fs/promises';
import { Bear } from '../entities/bear.model.js';
import { Repo } from './repo.interface.js';

const file = './data/data.json';

export class BearsFileRepo implements Repo<Bear> {
  async readAll(): Promise<Bear[]> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(initialData);
  }

  async readID(id: string): Promise<Bear> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Bear[] = JSON.parse(initialData);
    const finalData = data.find((item) => item.id === id);
    if (!finalData) throw new Error('Id not found');
    return finalData;
  }

  async write(info: Partial<Bear>): Promise<Bear> {
    const initalData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Bear[] = JSON.parse(initalData);
    const finalData = [...data, info];
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return info as Bear;
  }

  async update(info: Partial<Bear>): Promise<Bear> {
    if (!info.id) throw new Error('Not valid data');
    const initalData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Bear[] = JSON.parse(initalData);
    let updateItem: Bear = {} as Bear;
    const finalData = data.map((item) => {
      if (item.id === info.id) {
        updateItem = { ...item, ...info };
        return updateItem;
      }

      return item;
    });

    if (!updateItem.id) throw new Error('Id not found');
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return updateItem as Bear;
  }

  async delete(id: string): Promise<void> {
    const initalData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Bear[] = JSON.parse(initalData);
    const index = data.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Id not found');
    data.slice(index, 1);
    await fs.writeFile(file, JSON.stringify(data), 'utf-8');
  }
}
