import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GreeterClient as _dfsService_GreeterClient, GreeterDefinition as _dfsService_GreeterDefinition } from './dfsService/Greeter';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  dfsService: {
    Greeter: SubtypeConstructor<typeof grpc.Client, _dfsService_GreeterClient> & { service: _dfsService_GreeterDefinition }
    GreetingRequest: MessageTypeDefinition
    GreetingResponse: MessageTypeDefinition
  }
}

