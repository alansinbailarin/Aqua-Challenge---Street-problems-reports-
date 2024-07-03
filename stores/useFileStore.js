import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

export const useFileStore = defineStore("fileStore", () => {
  const previewImages = ref([]);
  const isLoading = ref(false);
  const maxFiles = 10;
  const maxFileSize = 5 * 1024 * 1024;
  const maxImages = 5;
  const maxVideos = 5;
  const maxAspectRatio = 1;
  const { $storage } = useNuxtApp();

  const addFile = async (file) => {
    if (previewImages.value.length >= maxFiles) {
      alert("You cannot upload more than 10 files.");
      return;
    }

    if (file.size > maxFileSize) {
      alert("File size should not exceed 5 MB.");
      return;
    }

    const type = file.type.startsWith("image") ? "image" : "video";
    const imageCount = previewImages.value.filter(
      (preview) => preview.type === "image"
    ).length;
    const videoCount = previewImages.value.filter(
      (preview) => preview.type === "video"
    ).length;

    if (type === "image" && imageCount >= maxImages) {
      alert("You cannot upload more than 5 images.");
      return;
    }

    if (type === "video" && videoCount >= maxVideos) {
      alert("You cannot upload more than 5 videos.");
      return;
    }

    const uniqueFileName = `${uuidv4()}-${file.name}`;

    const storageReference = storageRef($storage, `reports/${uniqueFileName}`);
    try {
      isLoading.value = true;
      const snapshot = await uploadBytes(storageReference, file);
      const url = await getDownloadURL(snapshot.ref);

      if (!isFileAlreadySelected(url)) {
        previewImages.value.push({
          url,
          type,
          name: uniqueFileName,
          size: file.size,
        });
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
    } finally {
      isLoading.value = false;
    }
  };

  function removeFile(index) {
    previewImages.value.splice(index, 1);
    resetFileInput();
  }

  function isFileAlreadySelected(url) {
    return previewImages.value.some((preview) => preview.url === url);
  }

  function resetFileInput() {
    const fileInput = document.getElementById("dropzone-file");
    if (fileInput) {
      fileInput.value = "";
    }
  }

  return {
    previewImages,
    addFile,
    removeFile,
    isLoading,
  };
});
