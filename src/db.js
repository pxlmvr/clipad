import fs from 'node:fs/promises'

const DB_PATH = new URL('../db.json', import.meta.url).pathname

/** Reads the JSON database file, parses it into a JS Object and returns it.  */
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(db)
}

/** Converts a db object to JSON and writes it to DB_PATH */
export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
  return db
}

/** Insert a note into the DB */
export const insertDB = async (note) => {
  const db = await getDB()

  await saveDB({
    notes: [...db.notes, note],
  })

  return note
}
