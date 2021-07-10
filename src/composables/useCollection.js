import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isLoading = ref(false);

  const addDocument = async (document) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await projectFirestore
        .collection(collection)
        .add(document);
      isLoading.value = false;
      return response;
    } catch (err) {
      error.value = err.message;
    }
  };

  const deleteDocument = async (id) => {
    const documentRef = await projectFirestore.collection(collection).doc(id);
    try {
      await documentRef.delete();
    } catch (err) {
      error.value = err.message || "Could not delete playlist";
    }
  };

  const updateDocument = async (id, updates) => {
    const documentRef = await projectFirestore.collection(collection).doc(id);
    try {
      documentRef.update(updates);
    } catch (err) {
      error.value = err.message || "Could not update playlist!";
    }
  };

  return { error, addDocument, deleteDocument, updateDocument, isLoading };
};

export default useCollection;
