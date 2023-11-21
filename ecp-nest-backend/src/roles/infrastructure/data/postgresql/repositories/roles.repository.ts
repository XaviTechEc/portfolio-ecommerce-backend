import { GetOneByNameProps } from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { ICustomGenericResponse } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';
import { PostgresGenericRepository } from 'src/common/frameworks/data-services/postgresql/repositories/postgres-generic-repository';
import { IRolesRepository } from 'src/roles/domain/abstracts/repositories/roles.repository';
import { Repository } from 'typeorm';

export class RolesPostgresRepository<TData>
  extends PostgresGenericRepository<TData>
  implements IRolesRepository<TData>
{
  constructor(
    repository: Repository<TData>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
    context: string,
    tableAlias: string,
  ) {
    super(repository, loggerService, exceptionsService, context, tableAlias);
  }

  async getRoleByName({
    name,
    user,
  }: GetOneByNameProps): Promise<ICustomGenericResponse<TData>> {
    try {
      const roleFound = await this._repository
        .createQueryBuilder('role')
        .where('role.value = :roleValue', { roleValue: name })
        .getOne();
      if (!roleFound) {
        this._exceptionsService.notFound({
          message: `Role with name ${name} could not be found`,
        });
      }
      return { success: true, data: roleFound };
    } catch (error) {
      this._exceptionsService.handler(error, this.constructor.name);
    }
  }

  // Add your custom logic here ↓↓↓
}
