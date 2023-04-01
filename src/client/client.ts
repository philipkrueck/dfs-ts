import { cleanPath, exitHandler } from '../shared/utils'
import { DFSClient } from './dfs-client'
import fs from 'fs'

interface Options {
  address: string
  mountPath: string
  deadlineTimeout: number
  help: boolean
}

type Command = 'fetch' | 'store' | 'delete' | 'list' | 'stat'

const main = async () => {
  const cmdArgs = process.argv.slice(2)
  const command = parseCommand(cmdArgs)
  const options = parseOptions(cmdArgs)
  const filename = parseFilename(cmdArgs)

  if (!command || options.help || (command !== 'list' && !filename)) {
    logUsage()
    return
  }

  if (options.mountPath === '') options.mountPath = 'mnt/client/'
  options.mountPath = cleanPath(`${process.cwd()}/${options.mountPath}`)

  if (!directoryExists(options.mountPath))
    throw new Error(`Mount path does not exist: ${options.mountPath}`)

  // use client
  const dfsClient = new DFSClient(
    options.address,
    options.deadlineTimeout,
    options.mountPath
  )
  dfsClient.processCommand(command, filename)
}

const directoryExists = (path: string): boolean => {
  try {
    const stat = fs.statSync(path)
    return stat.isDirectory()
  } catch (err) {
    return false
  }
}

export const parseOptions = (argv: string[]): Options => {
  const options: Options = {
    address: '0.0.0.0:42001',
    mountPath: '',
    deadlineTimeout: 10000,
    help: false,
  }

  let i = 0

  while (i < argv.length) {
    switch (argv[i]) {
      case '-a':
      case '--address':
        options.address = argv[++i]
        break
      case '-m':
      case '--mount_path':
        options.mountPath = argv[++i]
        break
      case '-t':
      case '--deadline_timeout':
        options.deadlineTimeout = Number(argv[++i])
        break
      case '-h':
      case '--help':
        options.help = true
        break
      default:
        // If the current argument doesn't match any option, assume it's the COMMAND argument
        return options
    }
    i++
  }

  return options
}

export const parseCommand = (argv: string[]): Command | undefined => {
  for (const arg of argv) {
    const command = arg.toLowerCase()
    if (
      command === 'fetch' ||
      command === 'store' ||
      command === 'delete' ||
      command === 'list' ||
      command === 'stat'
    ) {
      return command as Command
    }
  }
  return undefined
}

export const parseFilename = (argv: string[]): string | undefined => {
  const command = parseCommand(argv)
  if (command === 'list') {
    return undefined
  }

  for (let i = 0; i < argv.length - 1; i++) {
    if (argv[i].toLowerCase() === command) {
      return argv[i + 1]
    }
  }

  return undefined
}

const logUsage = () => {
  const usage = `
    USAGE: node client.js [OPTIONS] COMMAND [FILENAME]
    -a, --address <address>:  The RPC server address to connect to (default: 0.0.0.0:42001)
    -m, --mount_path <path>:  The mount path this client attaches to
    -t, --deadline_timeout <int>:  The deadline timeout in milliseconds (default: 10000)
    -h, --help:               Show help

    COMMAND is one of fetch|store|delete|list|stat.
    FILENAME is the filename to fetch, store, delete, or stat. The list command does not require a filename.\n\n`

  console.log(usage)
}

process.on('SIGINT', () => exitHandler('SIGINT'))
process.on('SIGTERM', () => exitHandler('SIGTERM'))
main()
