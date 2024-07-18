import { Request, Response, NextFunction } from 'express';

declare global {
  export type ExpressRequest = Request;
  export type ExpressResponse = Response;
  export type ExpressNext = NextFunction;
}