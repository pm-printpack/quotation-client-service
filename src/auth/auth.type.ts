import { FastifyRequest } from "fastify";

export type AuthPaylod = {
  sub: number;
  username: string;
};

export type AuthAdmin = {
  id: number;
  username: string;
};

export type AuthRequest = FastifyRequest & { user: AuthAdmin, logout: () => Promise<void> };