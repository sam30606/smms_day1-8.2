import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RedisService } from '../redis/redis.service';
import { EventsService } from './events.service';
@Module({
  providers: [EventsGateway, RedisService, EventsService],
})
export class EventsModule {}
