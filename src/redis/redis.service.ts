import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(pair: object) {
    pair['status'] = await this.redis.set(pair['key'], pair['value'], 'EX', 10000);
    return pair;
  }
  async rPush(pair: object) {
    pair['status'] = await this.redis.rpush(pair['key'], pair['value']);
    return pair;
  }
  async get(key: string) {
    const response: any = await this.redis.get(key);
    const result: object = {};
    result['key'] = key;
    result['value'] = response;
    return result;
  }
  async lRange(key: string) {
    const response: any = await this.redis.lrange(key, 0, -1);
    const result: object = {};
    result['key'] = key;
    result['value'] = response;
    return result;
  }
  async delete(key: string) {
    const response: any = await this.redis.del(key);
    const result: object = {};
    result['key'] = key;
    if (response === 0) result['status'] = 'was deleted';
    else result['status'] = 'deleted';
    return result;
  }
  async lRem(pair: object) {
    pair['status'] = await this.redis.lrem(pair['key'], 0, pair['value']);
    return pair;
  }
}
