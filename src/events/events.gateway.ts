import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
@WebSocketGateway(9090, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly eventsService: EventsService) {}
  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    console.log('joinRoom', data);
    // client.join(data['room']);
    const count: object = await this.eventsService.countMenber(client.id, data['action'], data['room']);
    // const clients = this.server.sockets.adapter.rooms.get(data['room']);
    // const numClients = clients ? { room: data['room'], count: clients.size } : { room: data['room'], count: 0 };
    // this.eventsService.getClients(this.server, clients, data['room']);
    this.server.emit('joinedRoom', data);
    this.server.emit('roomNotiMsg', data);
    // this.server.emit('updateClientCnt', numClients);
    this.server.emit('updateClientCnt', count);
  }
  @SubscribeMessage('leaveRoom')
  async leaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    console.log('leaveRoom', data);
    // client.leave(data['room']);
    const count: object = await this.eventsService.countMenber(client.id, data['action'], data['room']);
    // const clientsents = clients ? { room: data['room'], count: clients.size } : { room: data['room'], count: 0 };
    this.server.emit('roomNotiMsg', data);
    this.server.emit('leftRoom', data);
    // this.server.emit('updateClientCnt', numClients);
    this.server.emit('updateClientCnt', count);
  }

  @SubscribeMessage('msgToServer')
  async msgToServer(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    console.log('msgToServer', data);
    // this.server.to(data['room']).emit('msgToClient', data);
    const menbers: string[] = await this.eventsService.roomMenbers(data['room']);
    for (let i of menbers) {
      this.server.to(i).emit('msgToClient', data);
    }
  }
}
