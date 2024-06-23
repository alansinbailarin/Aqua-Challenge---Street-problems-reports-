<template>
  <aside
    class="w-3/12 bg-white border-r border-gray-100 p-4 shadow-sm overflow-y-auto overflow-auto"
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
      <div class="mb-2">
        <UiRange
          label-text="Gravedad de la fuga"
          label-for="gravity"
          v-model="gravity"
          :min="1"
          :max="100"
        />
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <UiDropdown
          id="statusButton"
          label-text="Estado"
          data-toggle="statusMenu"
          :dropdown-title="selectedStatus.text || 'Nuevo'"
          @selecting="statusSelection"
          :items="[
            { text: 'Nuevo', value: 'new' },
            { text: 'En revisión', value: 'inReview' },
            { text: 'En proceso', value: 'inProcess' },
            { text: 'Completado', value: 'completed' },
            { text: 'Cancelado', value: 'canceled' },
          ]"
        />
        <UiDropdown
          id="leakType"
          label-text="Fuga"
          data-toggle="leakTypeMenu"
          :dropdown-title="selectedLeakType.text || 'Agua potable'"
          @selecting="leakTypeSelection"
          :items="[
            { text: 'Potable', value: 'drinkingWater' },
            { text: 'Residual', value: 'sewageWater' },
            { text: 'No potable', value: 'noDrinkingWater' },
            { text: 'Vapor', value: 'vapor' },
          ]"
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
const mapStore = useMapStore();
const location = computed(() => mapStore.selectedLocationName);
const gravity = useLocalStorage(50, "reportGravity");
const selectedStatus = useLocalStorage(
  { text: "Nuevo", value: "new" },
  "selectedReportStatus"
);

const selectedLeakType = useLocalStorage(
  { text: "Potable", value: "drinkingWater" },
  "selectedLeakType"
);

function statusSelection(status) {
  selectedStatus.value = status;
}

function leakTypeSelection(leak) {
  selectedLeakType.value = leak;
}
</script>
