import { ICommentsRepository } from 'src/comments/domain/abstracts/repositories/comments.repository';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/comments/domain/dtos/graphql/inputs/comment.input';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Comment } from '../entities/Comment.entity';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'CommentsRepository';

export class CommentsRepository implements ICommentsRepository<Comment> {
  private _repository: Repository<Comment>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Comment>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getCommentsBy(
    term: string,
    fields: (keyof Comment)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<Comment>> {
    try {
      let queryOptions: FindManyOptions<Comment> = {};
      let relations: FindOptionsRelations<Comment> = {};
      let where: FindOptionsWhere<Comment> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'user') {
          relations = { ...relations, user: true };
          where = {
            ...where,
            user: [
              { username: ILike(`%${term}%`) },
              { email: ILike(`%${term}%`) },
              { fullName: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'review') {
          relations = { ...relations, review: true };
          where = {
            ...where,
            review: [{ content: ILike(`%${term}%`) }, { id: term }],
          };
        }

        if (field === 'comment') {
          relations = { ...relations, comment: true };
          where = {
            ...where,
            comment: [{ content: ILike(`%${term}%`) }, { id: term }],
          };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllComments(
    args?: IGenericArgs<Comment>,
  ): Promise<GetAllGenericResponse<Comment>> {
    try {
      let qb = this._repository.createQueryBuilder('comment');
      let pageSize;
      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          if (searchTerm) {
            qb = qb
              .where(`comment.content ILIKE LOWER(:content)`)
              .setParameters({
                content: `%${searchTerm}%`,
              });
          }
        }
      }

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getCommentById(id: string): Promise<Comment> {
    try {
      const commentFound = await this._repository.findOneBy({ id });
      if (!commentFound) {
        return this._exceptionsService.notFound({
          message: `The comment with id ${id} could not be found`,
        });
      }
      return commentFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createComment(
    createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    try {
      const newComment = this._repository.create({ ...createCommentInput });
      return this._repository.save(newComment);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    try {
      await this.getCommentById(id);
      const newComment = await this._repository.preload({
        ...updateCommentInput,
      });
      return this._repository.save(newComment);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeComment(id: string): Promise<Comment> {
    try {
      const comment = await this.getCommentById(id);
      return this._repository.remove(comment);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
