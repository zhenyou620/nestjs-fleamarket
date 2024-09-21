import { Injectable } from '@nestjs/common';
import { Item } from './items.model';
import { createItemDTO } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    return this.items.find((item) => item.id === id);
  }

  create(createItemDTO: createItemDTO): Item {
    const item: Item = {
      ...createItemDTO,
      status: 'ON_SALE',
    };
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = 'SOLD_OUT';
    return item;
  }

  delete(id: string) {
    this.items.filter((item) => item.id !== id);
  }
}
