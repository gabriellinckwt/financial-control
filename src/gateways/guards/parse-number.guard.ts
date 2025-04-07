import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ParseIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ params: { id: string | number } }>();
    const id = request.params.id;

    if (id) {
      request.params.id = typeof id === 'number' ? id : parseInt(id);
    }

    return true;
  }
}
