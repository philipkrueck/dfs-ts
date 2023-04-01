import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { GreetingRequest } from '../proto/dfsService/GreetingRequest'
import { ProtoGrpcType } from '../proto/dfs-service'
import { GreetingResponse } from '../proto/mypackage/GreetingResponse'

const PORT = 50051
const PROTO_FILE = path.join(__dirname, '../../proto/dfs-service.proto')

const packageDefinition = protoLoader.loadSync(PROTO_FILE)
const grcpObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType
const dfsService = grcpObject.dfsService

const main = () => {
  const server = getServer()
  server.bindAsync(
    `localhost:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err)
        return
      } else {
        console.log(`Server running at http://localhost:${port}`)
        server.start()
      }
    }
  )
}

const getServer = () => {
  const server = new grpc.Server()
  server.addService(dfsService.Greeter.service, {
    sayHello: sayHello,
  })
  return server
}

function sayHello(
  call: ServerUnaryCall<GreetingRequest, GreetingResponse>,
  callback: sendUnaryData<GreetingResponse>
) {
  const name = call.request.name
  const message = `Hello ${name}`
  const response: GreetingResponse = { message: message }

  console.log('Received request for:', name)

  callback(null, response)
}
main()
