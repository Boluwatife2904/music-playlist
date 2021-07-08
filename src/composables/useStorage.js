import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getCurrentUser from "./getCurrentUser"

const { user } = getCurrentUser()

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const response = await storageRef.put(file);
      url.value = await response.ref.getDownloadURL();
      console.log("image uploaded");
    } catch(err) {
      error.value = err.message;
    }
  }

  return {
    error,
    url,
    filePath,
    uploadImage
  }
}

export default useStorage;