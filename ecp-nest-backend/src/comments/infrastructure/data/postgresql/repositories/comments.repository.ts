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
<<<<<<< HEAD

const CONTEXT = 'CommentsRepository';
=======
>>>>>>> auth-module

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
  ): Promise<Comment[]> {
    try {
      let queryOptions: FindManyOptions<Comment> = {};
      let relations: FindOptionsRelations<Comment> = {};
      let where: FindOptionsWhere<Comment> = {};

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
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

      const commentsBy = (await this._repository.find(queryOptions)) ?? [];
      return commentsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllComments(args?: IGenericArgs<Comment>): Promise<Comment[]> {
    try {
      let qb = this._repository.createQueryBuilder('comment');

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          qb = qb.where(`comment.content ILIKE LOWER(:content)`).setParameters({
            content: `%${searchTerm}%`,
          });
        }
      }

      const comments = (await qb.getMany()) ?? [];
      return comments;
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
