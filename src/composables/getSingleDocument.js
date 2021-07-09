import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection, documentId) => {
  const error = ref(null);
  const isLoading = ref(false);
  const document = ref(null);

  isLoading.value = true;
  let documentRef = projectFirestore
    .collection(collection)
    .doc(documentId);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if(doc.data()) {
        document.value = { ...doc.data(), id: doc.id }
        error.value = null;
        isLoading.value = false;
      } else {
        error.value = "The playlist with this id doesn't exist!"
      }
    },
    (err) => {
      error.value = err.message || "Could not load details of the selected playlist";
      isLoading.value = false;
    }
  );

  watchEffect((onInvalidate) => {
    // Unsubscribing frm previous collection when component is unmounted
    onInvalidate(() => unsub());
  })

  return { error, isLoading, document };
};

export default getDocument;
