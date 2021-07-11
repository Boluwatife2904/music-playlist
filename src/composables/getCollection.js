import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection, query) => {
  const error = ref(null);
  const isLoading = ref(false);
  const documents = ref(null);

  isLoading.value = true;
  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  if (query) {
    collectionRef = collectionRef.where(...query)
  }

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
      isLoading.value = false;
    },
    (err) => {
      error.value = err.message || "Could not load messages";
      documents.value = null;
      isLoading.value = false;
    }
  );

  watchEffect((onInvalidate) => {
    // Unsubscribing frm previous collection when component is unmounted
    onInvalidate(() => unsub());
  });

  return { error, isLoading, documents };
};

export default getCollection;
