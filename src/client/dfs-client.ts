import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../proto/dfs-service'
import { GreetingRequest } from '../proto/dfsService/GreetingRequest'
import { GreetingResponse } from '../proto/dfsService/GreetingResponse'
import { GreeterClient } from '../proto/dfsService/Greeter'

const PROTO_FILE = path.join(__dirname, '../../proto/dfs-service.proto')
const PORT = 50051

const packageDefinition = protoLoader.loadSync(PROTO_FILE)
const grcpObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType
const dfsService = grcpObject.dfsService

type CallSayHello = (request: GreetingRequest) => Promise<GreetingResponse>

export class DFSClient {
  private client: GreeterClient

  constructor(
    private serverAddress: string,
    private deadlineTimeout: number,
    private mountPath: string
  ) {
    this.client = this.getClient(serverAddress)
  }

  /**
   * Handles the requested command from the user.
   *
   * @param command - The command to process
   * @param filename - The filename associated with the command
   */
  public processCommand = async (
    command: string,
    filename: string | undefined
  ): Promise<void> => {
    console.log(`Processing command: ${command} ${filename}`)

    const request: GreetingRequest = { name: 'Bob' }

    try {
      const response = await this.callSayHello(request)
      console.log(`Response: ${response.message}`)
    } catch (error) {
      console.error(error)
    }
  }

  private getClient = (serverAddress: string): GreeterClient => {
    return new dfsService.Greeter(
      serverAddress,
      grpc.credentials.createInsecure()
    )
  }

  private callSayHello: CallSayHello = (request) => {
    return new Promise((resolve, reject) => {
      this.client.sayHello(request, (error, response) => {
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
}
