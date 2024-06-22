<template>
  <aside
    class="w-3/12 bg-white border-r border-gray-100 p-4 shadow-sm overflow-y-auto"
  >
    <div>
      <h1 class="font-bold mb-2 text-xl">Tu problema puede ser escuchado 🦻🏻</h1>
      <div class="flex items-center gap-3 mb-1">
        <p class="text-blue-500 text-sm">{{ location }}</p>
      </div>
      <p class="text-sm mb-4 leading-relaxed text-gray-400">
        Los detalles de tu reporte serán enviados a las autoridades locales, a
        los encargados de la red de agua potable de tu comunidad y a todos los
        usuarios interesados en ver el reporte.
      </p>
    </div>
    <form>
      <div class="mb-4">
        <UiTextInput
          label-for="report-title"
          label-text="Define el problema"
          placeholder="Fuga de agua masiva..."
        />
      </div>
      <div class="mb-4">
        <UiTextAreaInput
          label-for="report-description"
          label-text="Escribe una descripcion del problema"
          placeholder="Una alcantarilla esta tirando agua..."
        />
      </div>

      <div>
        <h1 class="text-gray-900 font-semibold">Sección de imagenes</h1>
        <p class="text-sm text-gray-400 mb-3">
          Introduce las imagenes/videos necesarios para crear tu reporte, se
          bastante especifico con las mismas y recuerda que la calidad es
          importante!
        </p>
        <UiFileInput />
      </div>
    </form>
  </aside>
</template>
<script setup>
const location = useLocalStorage(null, "selectedLocationName");

watch(location, (newLocation, oldLocation) => {
  if (newLocation !== oldLocation) {
    console.log("Location changed:", newLocation);
  }
});
onMounted(() => {
  console.log(location.value);
});
</script>
