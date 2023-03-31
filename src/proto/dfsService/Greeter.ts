// Original file: proto/dfs-service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GreetingRequest as _dfsService_GreetingRequest, GreetingRequest__Output as _dfsService_GreetingRequest__Output } from '../dfsService/GreetingRequest';
import type { GreetingResponse as _dfsService_GreetingResponse, GreetingResponse__Output as _dfsService_GreetingResponse__Output } from '../dfsService/GreetingResponse';

export interface GreeterClient extends grpc.Client {
  SayHello(argument: _dfsService_GreetingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _dfsService_GreetingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _dfsService_GreetingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _dfsService_GreetingRequest, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _dfsService_GreetingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _dfsService_GreetingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _dfsService_GreetingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _dfsService_GreetingRequest, callback: grpc.requestCallback<_dfsService_GreetingResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GreeterHandlers extends grpc.UntypedServiceImplementation {
  SayHello: grpc.handleUnaryCall<_dfsService_GreetingRequest__Output, _dfsService_GreetingResponse>;
  
}

export interface GreeterDefinition extends grpc.ServiceDefinition {
  SayHello: MethodDefinition<_dfsService_GreetingRequest, _dfsService_GreetingResponse, _dfsService_GreetingRequest__Output, _dfsService_GreetingResponse__Output>
}
