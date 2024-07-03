import { Request, Response } from 'express';

declare global {
  export type ExpressRequest = Request;
  export type ExpressResponse = Response;
}