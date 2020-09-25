export const initFirestoreData = (items): [] =>
  items.map(({ payload }) => ({
    id: payload.doc.id,
    ...payload.doc.data(),
  }));
export const initFirestore = (items) =>
  items.map(({ payload }) => ({
    ...payload.doc.data(),
  }));
