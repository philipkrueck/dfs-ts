import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../proto/dfs-service'
import { GreetingRequest } from '../proto/dfsService/GreetingRequest'
import {
  GreetingResponse,
  GreetingResponse__Output,
} from '../proto/dfsService/GreetingResponse'
import { GreeterClient } from '../proto/dfsService/Greeter'

const PROTO_FILE = path.join(__dirname, '../../proto/dfs-service.proto')
const PORT = 50051

const packageDefinition = protoLoader.loadSync(PROTO_FILE)
const grcpObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType
const dfsService = grcpObject.dfsService

const main = async () => {
  const client = getClient()
  const name = process.argv[2] || 'Bob'
  const request: GreetingRequest = { name: name }

  try {
    const response = await callSayHello(client, request)
    console.log(`Response: ${response.message}`)
  } catch (error) {
    console.error(error)
  }
}

const getClient = () => {
  return new dfsService.Greeter(
    `localhost:${PORT}`,
    grpc.credentials.createInsecure()
  )
}

type CallSayHello = (
  client: GreeterClient,
  request: GreetingRequest
) => Promise<GreetingResponse>

const callSayHello: CallSayHello = (client, request) => {
  return new Promise((resolve, reject) => {
    client.sayHello(request, (error, response) => {
      if (error) {
        reject(error)
      } else {
        if (!response) {
          reject('Response is undefined')
        } else {
          resolve(response)
        }
      }
    })
  })
}

main()
