import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExcludePrefixMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("req", req.path);
    
    const excludedRoutes = ['Authenticate'];

    if (excludedRoutes.includes(req.path)) {
      req.url = req.url.replace('/api/services/app', '');
    }
    next();
  }
}
