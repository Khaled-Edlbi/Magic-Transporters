import { Request, Response, NextFunction } from 'express'
import * as QueryString from 'qs'


export type ApiViewProps = {
  req: Request<object, unknown, unknown, QueryString.ParsedQs, Record<string, unknown>>;
  res: Response<Record<string, unknown>>;
  next: NextFunction;
  err?: {
    status: unknown,
    stack: unknown
  }
}
