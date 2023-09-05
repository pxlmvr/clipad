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

describe('insertDB', () => {
  test('newNote inserts data and returns it', async () => {
    const note = {
      content: 'test note',
      tags: ['tag1', 'tag2'],
      id: Date.now(),
    }

    insertDB.mockResolvedValue(newNote)

    const result = await newNote(note.content, note.tags)
    expect(result).toEqual(note)
  })
})
