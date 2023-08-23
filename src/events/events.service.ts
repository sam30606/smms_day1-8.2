import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Socket } from 'socket.io';
@Injectable()
export class EventsService {
  constructor(private readonly redisService: RedisService) {}

  async countMenber(id: string, action: string, room: string): Promise<object> {
    action === 'join' ? this.redisService.rPush({ key: room, value: id }) : this.redisService.lRem({ key: room, value: id });
    const roomObj: object = await this.redisService.lRange(room);
    let menbers: string[] = roomObj['value'];
    let count: number = menbers.length;
    return { room: room, count: count };
  }
  async roomMenbers(room: string): Promise<string[]> {
    const roomObj: object = await this.redisService.lRange(room);
    const menbers: string[] = roomObj['value'];
    return menbers;
  }
  getClients(server: any, clients: Set<string>, room: string) {
    const roomObj: object = this.redisService.lRange(room);
    console.log();
    let menbers: string[];
    for (const clientId of clients) {
      this.redisService.rPush({ key: room, value: clientId });
      // menbers.push(clientId);
      console.log(clientId);
      const clientSocket = server.sockets.sockets.get(clientId);
      // console.log(clientSocket);
      //you can do whatever you need with this
      // clientSocket.leave('Other Room');
    }
  }
  // joinSocketRoom(client: Socket, room: string) {
  //   client.join(room);
  //   return client;
  // }
}
