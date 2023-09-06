import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICommentsRepository } from 'src/core/abstracts/repositories';
import {
  CreateCommentInput,
  PaginationArgs,
  UpdateCommentInput,
} from 'src/core/dtos';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { Comment } from '../../entities/outputs/entities';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
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
  async getCommentsBy(
    term: string,
    fields: (keyof Comment)[],
    paginationArgs: PaginationArgs,
  ): Promise<Comment[]> {
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

    const commentsBy = await this._repository.find(queryOptions);
    return commentsBy;
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
        const { searchTerm } = searchArgs;

        qb = qb.where(`comment.content ILIKE LOWER(:content)`).setParameters({
          content: `%${searchTerm}%`,
        });
      }
    }

    const comments = await qb.getMany();
    return comments;
  }

  async getCommentById(id: string): Promise<Comment> {
    const commentFound = await this._repository.findOneBy({ id });
    if (!commentFound) {
      return this._exceptionsService.notFound({
        message: `The comment with id ${id} could not be found`,
      });
    }
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
    return this._repository.save(newComment);
  }

  async removeComment(id: string): Promise<Comment> {
    const comment = await this.getCommentById(id);
    return this._repository.remove(comment);
  }
}
