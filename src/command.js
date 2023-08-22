import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command(
    'new <note>',
    'Create a new note',
    (yargs) => {
      return yargs.positional('note', {
        type: 'string',
        description: 'Content of the note to be created',
      })
    },
    (argv) => {
      console.log(argv.note)
    }
  )
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'Tags to add to the note',
  })
  .command(
    'all',
    'Get all notes',
    () => {},
    async (argv) => {}
  )
  .command(
    'find <filter>',
    'Get matching notes',
    (yargs) => {
      return yargs.positional('filter', {
        describe:
          'The search term to filter notes by, will be applied to note.content',
        type: 'string',
      })
    },
    async (argv) => {}
  )
  .command('remove <id>', 'Remove a note by ID', (yargs) => {
    return (
      yargs.positional('id', {
        type: 'number',
        description: 'The ID of the note to remove',
      }),
      (argv) => {}
    )
  })
  .command(
    'web [port]',
    'Launch web view to see notes',
    (yargs) => {
      return yargs.positional('port', {
        type: 'number',
        default: 5000,
        describe: 'port to bind on',
      })
    },
    async (argv) => {}
  )
  .command(
    'clean',
    'Remove all notes',
    () => {},
    async (argv) => {}
  )
  .demandCommand(1)
  .parse()
