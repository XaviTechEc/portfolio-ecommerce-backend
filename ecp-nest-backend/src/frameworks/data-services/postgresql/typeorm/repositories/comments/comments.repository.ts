import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICommentsRepository } from 'src/core/abstracts/repositories';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class CommentsRepository implements ICommentsRepository<Comment> {
  private _repository: Repository<Comment>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Comment>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllComments(args?: IGenericArgs<Comment>): Promise<Comment[]> {
    let qb = this._repository.createQueryBuilder('comment');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm, searchFields } = searchArgs;
        if (searchTerm.trim.length === 0) return;
        if (!searchFields || searchFields.length === 0) {
          return this._exceptionsService.badRequest({
            message: 'Search fields are required',
            code_error: 404,
          });
        }

        searchFields.forEach((sf) => {
          if (sf === 'content') {
            qb = qb.andWhere(`${sf} ILIKE LOWER(:content)`, {
              content: `%${searchTerm}%`,
            });
          }
        });
      }
    }
  }

  async getCommentById(id: string): Promise<Comment> {
    const commentFound = await this._repository.findOneBy({ id });
    return this._repository.save(commentFound);
  }

  async createComment(
    createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    const newComment = this._repository.create({ ...createCommentInput });
    return newComment;
  }

  async updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    await this.getCommentById(id);
    const newComment = await this._repository.preload({
      ...updateCommentInput,
    });
    if (!newComment) {
      return this._exceptionsService.notFound({
        message: 'The comment could not be preloaded',
      });
    }
  }

  async removeComment(id: string): Promise<Comment> {
    const comment = await this.getCommentById(id);
    return this._repository.remove(comment);
  }
}
