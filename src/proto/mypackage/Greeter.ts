// Original file: proto/dfs-service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GreetingRequest as _mypackage_GreetingRequest, GreetingRequest__Output as _mypackage_GreetingRequest__Output } from '../mypackage/GreetingRequest';
import type { GreetingResponse as _mypackage_GreetingResponse, GreetingResponse__Output as _mypackage_GreetingResponse__Output } from '../mypackage/GreetingResponse';

export interface GreeterClient extends grpc.Client {
  SayHello(argument: _mypackage_GreetingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _mypackage_GreetingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _mypackage_GreetingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _mypackage_GreetingRequest, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _mypackage_GreetingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _mypackage_GreetingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _mypackage_GreetingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _mypackage_GreetingRequest, callback: grpc.requestCallback<_mypackage_GreetingResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GreeterHandlers extends grpc.UntypedServiceImplementation {
  SayHello: grpc.handleUnaryCall<_mypackage_GreetingRequest__Output, _mypackage_GreetingResponse>;
  
}

export interface GreeterDefinition extends grpc.ServiceDefinition {
  SayHello: MethodDefinition<_mypackage_GreetingRequest, _mypackage_GreetingResponse, _mypackage_GreetingRequest__Output, _mypackage_GreetingResponse__Output>
}
