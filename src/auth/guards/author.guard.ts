import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionService } from '../../transaction/transaction.service';
import { CategoryService } from '../../category/category.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly transactionService: TransactionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { type, id } = request.params;

    console.log('request.params', request.params);

    let entity;

    switch (type) {
      case 'transaction':
        entity = await this.transactionService.findOne(+id);
        break;
      case 'category':
        entity = await this.categoryService.findOne(id);
        break;
      default:
        throw new NotFoundException('Something wen wrong!!');
    }

    console.log(entity);

    const user = request.user;

    console.log('entity.user', entity.user);
    if (entity && user && entity.user.id === user.id) {
      return true;
    }

    throw new BadRequestException('Something wen wrong with author');
  }
}
