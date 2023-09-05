import { jest } from '@jest/globals'

// Mock database helpers
jest.unstable_mockModule('../src/db.js', () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}))

// Await importing db helpers (this is needed in order to mock them)
const { insertDB, getDB, saveDB } = await import('../src/db.js')
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js')

// Clear mocks in between tests
beforeEach(() => {
  insertDB.mockClear()
  getDB.mockClear()
  saveDB.mockClear()
})

describe('db helpers', () => {
  test('newNote inserts data and returns it', async () => {
    const note = {
      content: 'test note',
      tags: ['tag1', 'tag2'],
      id: Date.now(),
    }

    insertDB.mockResolvedValue(note)

    const result = await newNote(note.content, note.tags)
    expect(result.content).toEqual(note.content)
    expect(result.tags).toEqual(note.tags)
  })

  test('newNote can create a note without tags', async () => {
    const note = {
      content: 'test note',
      id: Date.now(),
    }

    insertDB.mockResolvedValue(note)

    const result = await newNote(note.content, [])
    expect(result.tags).toEqual([])
  })

  test('getAllNotes returns all notes', async () => {
    const db = {
      notes: ['note1', 'note2', 'note3'],
    }

    getDB.mockResolvedValue(db)

    const result = await getAllNotes()
    expect(result).toEqual(db.notes)
  })

  test('removeNote does nothing if id is not found', async () => {
    // populate the DB
    const notes = [
      { id: 1, content: 'note 1' },
      { id: 2, content: 'note 2' },
      { id: 3, content: 'note 3' },
    ]

    saveDB.mockResolvedValue(notes)

    const idToRemove = 4
    const result = await removeNote(idToRemove)
    expect(result).toBeUndefined()
  })
})
