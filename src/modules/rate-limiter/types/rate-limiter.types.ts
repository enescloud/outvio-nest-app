export type RateLimiterRedisRegister = {
  totalHits: number;
  expiresAt: number;
};

export type RateLimiterOptions = {
  ip: string;
  ttl: number;
  weight: number;
  token?: string;
};

export enum RedisKeyType {
  ip = 'ip',
  token = 'token',
}
