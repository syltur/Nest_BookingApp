import { ConflictException, Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from '../shared/services/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) { }

  public getAll(): Promise<Author[]> {
    return this.prismaService.author.findMany({});
  }

  public getById(id: Author['id']): Promise<Author | null> {
    return this.prismaService.author.findUnique({
      where: { id },
    });
  }

  public async createAuthor(authorData: Omit<Author, 'id'>): Promise<Author> {
    try {
      return await this.prismaService.author.create({
        data: authorData,
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Author already exists');
      throw error;
    }
  }

  public async updateAuthor(
    id: Author['id'],
    authorData: Omit<Author, 'id'>,
  ): Promise<Author> {
    try {
      return await this.prismaService.author.update({
        where: { id },
        data: authorData,
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Author already exists');
      throw error;
    }
  }

  public deleteAuthor(id: Author['id']): Promise<Author> {
    return this.prismaService.author.delete({
      where: { id },
    });
  }
}
