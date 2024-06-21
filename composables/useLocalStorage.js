export default function useLocalstorage(key, defaultValue) {
  const val = ref(defaultValue);

  if (process.client) {
    const storageVal = window.localStorage.getItem(key);

    if (storageVal) {
      val.value = JSON.parse(storageVal);
    }

    function handleStorageEvent(event) {
      if (event.key === key) {
        val.value = JSON.parse(event.newValue || "null");
      }
    }

    window.addEventListener("storage", handleStorageEvent);

    onScopeDispose(() =>
      window.removeEventListener("storage", handleStorageEvent)
    );

    watch(
      val,
      (newValue) => window.localStorage.setItem(key, JSON.stringify(newValue)),
      {
        deep: true,
      }
    );
  }

  return val;
}
