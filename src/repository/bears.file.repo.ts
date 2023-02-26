import fs from 'fs/promises';

export type Bear = {
  id: number;
  name: string;
  type: string;
  height: string;
  weight: string;
};

const file = './data/data.json';

export class BearsFileRepo {
  readAll() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Bear[]);
  }

  async readID(id: Bear['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Bear[] = JSON.parse(data);
    return parsedData.filter((item) => item.id === id)[0];
  }

  async write(info: Bear) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Bear[] = JSON.parse(data);
    const newID = Math.max(...parsedData.map((item) => item.id));
    info.id = newID + 1;
    const lastData = JSON.stringify([...parsedData, info]);
    await fs.writeFile(file, lastData, 'utf-8');
  }

  async update(info: Bear) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Bear[] = JSON.parse(data);
    const lastData = JSON.stringify(
      parsedData.map((item) => (item.id === info.id ? info : item))
    );
    await fs.writeFile(file, lastData, 'utf-8');
  }

  async delete(id: Bear['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Bear[] = JSON.parse(data);
    const lastData = JSON.stringify(
      parsedData.filter((item) => item.id !== id)
    );
    await fs.writeFile(file, lastData, 'utf-8');
  }
}
