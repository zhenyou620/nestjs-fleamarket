import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client';
import { createItemDTO } from './dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDTO: createItemDTO, userId: string): Promise<Item> {
    const { name, price, description } = createItemDTO;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
        userId: userId,
      },
    });
  }

  async updateStatus(id: string): Promise<Item> {
    return await this.prismaService.item.update({
      data: {
        status: 'SOLD_OUT',
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string, userId: string) {
    await this.prismaService.item.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
