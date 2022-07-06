import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1)
  const text = jateDb.transaction('jate', 'readwrite')
  const store = text.objectStore('jate')
  const request = store.put({ id: 1, value: content})
  const final = await request
  if (final){console.log('Data saved to DB',final.value)}
  else {
    console.log('Data didnt save to DB')
  }
  // return final
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database')
  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readonly')
  const store = text.objectStore('jate')
  const request = store.get(1)
  const final = await request
  //Still return something even if there is no data
  //Would return undefined if no data/null
  if (final){
    console.log('Data found in the DB!', final?.value)
    return final?.value
       //return final IF there is data in final. 
  } else {
    console.log('Data wasnt found!')
  }
  // return final
}
initdb();


