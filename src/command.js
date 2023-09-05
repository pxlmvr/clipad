import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {
  newNote,
  getAllNotes,
  findNotes,
  removeNote,
  removeAllNotes,
} from './notes.js'
import { listNotes } from './utils.js'
import { start } from './server.js'

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
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(',') : []
      const note = await newNote(argv.note, tags)

      console.log('Note added: ', note)
    }
  )
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'Tags to add to the note, comma-separated',
  })
  .command(
    'all',
    'Get all notes',
    () => {},
    async (_argv) => {
      const notes = await getAllNotes()
      listNotes(notes)
    }
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
    async (argv) => {
      const matches = await findNotes(argv.filter)

      return listNotes(matches)
    }
  )
  .command(
    'remove <id>',
    'Remove a note by ID',
    (yargs) => {
      return yargs.positional('id', {
        type: 'number',
        description: 'The ID of the note to remove',
      })
    },
    async (argv) => {
      const returnedId = await removeNote(argv.id)
      console.log(returnedId)
    }
  )
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
    async (argv) => {
      const notes = await getAllNotes()
      start(notes, argv.port)
    }
  )
  .command(
    'clean',
    'Remove all notes',
    () => {},
    async (_argv) => {
      const notes = await getAllNotes()

      await removeAllNotes()
      console.log(
        `Removed ${notes.length} ${notes.length === 1 ? 'note' : 'notes'}.`
      )
    }
  )
  .demandCommand(1)
  .parse()
