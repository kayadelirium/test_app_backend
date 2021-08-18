import { Request, Response } from 'express';

export interface IRouteHandler {
    method: IRequestMethod;
    route: string;
    middleware?: IRouteHandlerMiddleware[];
    handler: IRouteHandlerHandler;
}

export type IRequestMethod = 'get' | 'post' | 'delete' | 'put';

export type IRouteHandlerHandler = (
    request: Request,
    response: Response
) => any;

export type IRouteHandlerMiddleware = (
    request: Request,
    response: Response,
    next: any
) => void;
