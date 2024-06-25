export const useFileStore = defineStore("fileStore", () => {
  const previewImages = ref([]);
  const maxFiles = 10;
  const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
  const maxImages = 5;
  const maxVideos = 5;

  function addFile(file) {
    if (previewImages.value.length >= maxFiles) {
      alert("You cannot upload more than 10 files.");
      return;
    }

    if (file.size > maxFileSize) {
      alert("File size should not exceed 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const url = e.target.result;
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

      if (!isFileAlreadySelected(file)) {
        previewImages.value.push({
          url,
          type,
          name: file.name,
          size: file.size,
        });
      }
    };

    reader.readAsDataURL(file);
  }

  function removeFile(index) {
    previewImages.value.splice(index, 1);
  }

  function isFileAlreadySelected(file) {
    return previewImages.value.some(
      (preview) => preview.name === file.name && preview.size === file.size
    );
  }

  return {
    previewImages,
    addFile,
    removeFile,
  };
});
