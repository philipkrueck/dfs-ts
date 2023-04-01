import { parseOptions, parseCommand, parseFilename } from '../src/client/client'
import { faker } from '@faker-js/faker'

describe('parseOptions', () => {
  it('should return default options when no arguments are provided', () => {
    // given
    const argv: string[] = []

    // when
    const result = parseOptions(argv)

    // then
    expect(result).toEqual({
      address: '0.0.0.0:42001',
      mountPath: '',
      deadlineTimeout: 10000,
      help: false,
    })
  })

  it('should return options with custom address', () => {
    // given
    const argv = ['-a', '192.168.1.100:8080']

    // when
    const result = parseOptions(argv)

    // then
    expect(result).toEqual({
      address: '192.168.1.100:8080',
      mountPath: '',
      deadlineTimeout: 10000,
      help: false,
    })
  })

  it('should return options with custom mount path and deadline timeout', () => {
    // given
    const argv = ['-m', '/mnt/dfs', '-t', '5000']

    // when
    const result = parseOptions(argv)

    // then
    expect(result).toEqual({
      address: '0.0.0.0:42001',
      mountPath: '/mnt/dfs',
      deadlineTimeout: 5000,
      help: false,
    })
  })

  it('should return options with help flag', () => {
    // given
    const argv = ['-h']

    // when
    const result = parseOptions(argv)

    // then
    expect(result).toEqual({
      address: '0.0.0.0:42001',
      mountPath: '',
      deadlineTimeout: 10000,
      help: true,
    })
  })
})

describe('parseCommand', () => {
  it('should return undefined when no command is provided', () => {
    // given
    const argv: string[] = []

    // when
    const result = parseCommand(argv)

    // then
    expect(result).toBeUndefined()
  })

  const commands = ['fetch', 'store', 'delete', 'list', 'stat']

  it.each(commands)(
    'should return the command when it is provided',
    (command) => {
      // given
      const argv = [command]

      // when
      const result = parseCommand(argv)

      // then
      expect(result).toEqual(command)
    }
  )

  it.each(commands)('should return the command in uppercase', (command) => {
    // given
    const argv = [command.toUpperCase()]

    // when
    const result = parseCommand(argv)

    // then
    expect(result).toEqual(command)
  })

  it('should return undefined when an invalid command is provided', () => {
    // given
    const argv = [faker.lorem.word()]

    // when
    const result = parseCommand(argv)

    // then
    expect(result).toBeUndefined()
  })
})

describe('parseFilename', () => {
  it('should return undefined when no filename is provided', () => {
    // given
    const argv: string[] = []

    // when
    const result = parseFilename(argv)

    // then
    expect(result).toBeUndefined()
  })

  it('should return undefined when cmd options are provided, but no filename', () => {
    // given
    const argv = ['-a', 'localhost:42001', '-m', '/mnt/dfs', 'FETCH']

    // when
    const result = parseFilename(argv)

    // then
    expect(result).toBeUndefined()
  })

  it('should return undefined when the command is "list"', () => {
    // given
    const argv = ['list']

    // when
    const result = parseFilename(argv)

    // then
    expect(result).toBeUndefined()
  })

  it('should return the filename when it is provided', () => {
    // given
    const argv = ['store', 'test.txt']

    // when
    const result = parseFilename(argv)

    // then
    expect(result).toEqual('test.txt')
  })

  it('should return the filename when cmd options are provided', () => {
    // given
    const argv = [
      '-a',
      'localhost:42001',
      '-m',
      '/mnt/dfs',
      'FETCH',
      'test.txt',
    ]

    // when
    const result = parseFilename(argv)

    // then
    expect(result).toEqual('test.txt')
  })
})
