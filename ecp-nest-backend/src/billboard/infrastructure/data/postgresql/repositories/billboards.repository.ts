import { IBillboardsRepository } from 'src/billboard/domain/abstracts/repositories/billboards.repository';
import {
  CreateBillboardInput,
  UpdateBillboardInput,
} from 'src/billboard/domain/dtos/graphql/inputs/billboard.input';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { Repository } from 'typeorm';
import { Billboard } from './../entities/Billboard.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'BillboardsRepository';

export class BillboardsRepository implements IBillboardsRepository<Billboard> {
  private _repository: Repository<Billboard>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Billboard>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllBillboards(
    args?: IGenericArgs<Billboard>,
  ): Promise<GetAllGenericResponse<Billboard>> {
    try {
      let qb = this._repository.createQueryBuilder('billboard');
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
            qb = qb.where(`billboard.title ILIKE LOWER(:title)`).setParameters({
              title: `%${searchTerm}%`,
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
  async getBillboardById(id: string): Promise<Billboard> {
    try {
      const billboardFound = await this._repository.findOneBy({ id });
      if (!billboardFound) {
        return this._exceptionsService.notFound({
          message: `The billboard with id ${id} could not be found`,
        });
      }
      return billboardFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createBillboard(
    createBillboardInput: CreateBillboardInput,
  ): Promise<Billboard> {
    try {
      const newBillboard = this._repository.create(createBillboardInput);
      return this._repository.save(newBillboard);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateBillboard(
    id: string,
    updateBillboardInput: UpdateBillboardInput,
  ): Promise<Billboard> {
    try {
      await this.getBillboardById(id);
      const updatedBillboard = this._repository.create(updateBillboardInput);
      return this._repository.save(updatedBillboard);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeBillboard(id: string): Promise<Billboard> {
    try {
      const billboardFound = await this.getBillboardById(id);
      return this._repository.remove(billboardFound);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
