/** List notes in a human friendly format */
export const listNotes = (notes) => {
  notes.forEach(({ id, content, tags }) => {
    console.log('\n')
    console.log('ID: ', id)
    console.log('NOTE: ', content)
    console.log('TAGS: ', tags)
  })
}
