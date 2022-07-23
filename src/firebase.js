
import firestore from '@react-native-firebase/firestore';

const db = firestore();
const addUpdateData = async ({table, data, docType}) => {
  await db.collection(table)?.doc(docType).set(data);
};

const updateData = async ({table, data, id}) => {
  await db.collection(table).doc(id).update(data);
};

const findData = async ({table}) => {
  return db.collection(table).get();
};

const deleteData = ({table, id}) => {
  db.collection(table).doc(id).delete();
};

export {addUpdateData, findData, deleteData, db, updateData};
