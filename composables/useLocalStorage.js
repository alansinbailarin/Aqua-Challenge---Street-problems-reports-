export default function useLocalStorage(initialValue, key) {
  const val = ref(initialValue);

  onMounted(() => {
    const storageValue = window.localStorage.getItem(key);

    if (storageValue) {
      val.value = JSON.parse(storageValue);
    }
  });
  watch(
    val,
    (val) => {
      window.localStorage.setItem(key, JSON.stringify(val));
    },
    { deep: true }
  );

  return val;
}
