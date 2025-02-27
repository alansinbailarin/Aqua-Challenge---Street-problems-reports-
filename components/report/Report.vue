<template>
  <h1 class="font-bold mb-2 text-xl">Tu problema puede ser escuchado 🦻🏻</h1>
  <div class="flex items-center gap-3 mb-1">
    <p class="text-blue-500 text-sm">{{ location }}</p>
  </div>
  <p class="text-sm mb-4 leading-relaxed text-gray-400">
    Los detalles de tu reporte serán enviados a las autoridades locales, a los
    encargados de la red de agua potable de tu comunidad y a todos los usuarios
    interesados en ver el reporte.
  </p>
  <div>
    <div class="mb-4">
      <UiTextInput
        label-for="report-title"
        label-text="Define el problema"
        placeholder="Fuga de agua masiva..."
        v-model="form.title"
      />
    </div>
    <div class="mb-4">
      <UiTextAreaInput
        label-for="report-description"
        label-text="Escribe una descripcion del problema"
        placeholder="Una alcantarilla esta tirando agua..."
        v-model="form.description"
      />
    </div>
    <div class="mb-2">
      <UiRange
        label-text="Gravedad de la fuga"
        label-for="gravity"
        v-model="form.gravity"
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
        :dropdown-title="selectedLeakType.text || 'Potable'"
        @selecting="leakTypeSelection"
        :items="[
          { text: 'Potable', value: 'drinkingWater' },
          { text: 'Residual', value: 'sewageWater' },
          { text: 'No potable', value: 'noDrinkingWater' },
          { text: 'Vapor', value: 'vapor' },
        ]"
      />
    </div>
    <div class="grid grid-cols-1 mb-4">
      <UiDropdown
        id="impactButton"
        label-text="Impacto"
        data-toggle="impactMenu"
        :dropdown-title="
          selectedImpact.length > 0
            ? selectedImpact[selectedImpact.length - 1].text
            : 'Selecciona el impacto'
        "
        @selecting="impactSelection"
        :items="[
          { text: 'Encharcamiento', value: 'waterlogging' },
          { text: 'Erosión del Suelo', value: 'soilErosion' },
          {
            text: 'Deterioro de Infraestructuras',
            value: 'infrastructureDeterioration',
          },
          { text: 'Contaminación del Agua', value: 'waterContamination' },
          { text: 'Daños a la Propiedad', value: 'propertyDamage' },
          { text: 'Incremento de Facturas', value: 'billIncrease' },
          { text: 'Desperdicio de Recursos', value: 'resourceWaste' },
          { text: 'Proliferación de Plagas', value: 'pestProliferation' },
          { text: 'Impacto Ambiental', value: 'environmentalImpact' },
          { text: 'Riesgos de Seguridad', value: 'safetyRisks' },
          { text: 'Interrupción de Servicios', value: 'serviceInterruption' },
        ]"
      />
      <ul class="mt-2 space-y-2">
        <li
          v-for="(impact, index) in selectedImpact"
          :key="index"
          @click="removeImpact(index)"
          class="flex justify-between cursor-pointer items-center hover:text-red-500 transition-all ease-in-out duration-300 hover:bg-gray-100 bg-gray-50 px-5 py-2.5 text-sm text-gray-700 rounded"
        >
          <span>{{ impact.text }} </span>
        </li>
      </ul>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-4">
      <UiDropdown
        id="leakSize"
        label-text="Tamaño"
        data-toggle="leakSizeMenu"
        :dropdown-title="selectedLeakSize.text || 'Pequeña'"
        @selecting="leakSizeSelection"
        :items="[
          { text: 'Pequeña', value: 'small' },
          { text: 'Mediana', value: 'medium' },
          { text: 'Grande', value: 'large' },
        ]"
      />
      <UiDropdown
        id="leakDuration"
        label-text="Duración"
        data-toggle="leakDurationMenu"
        :dropdown-title="selectedLeakDuration.text || '< 1 hora'"
        @selecting="leakDurationSelection"
        :items="[
          { text: '< 1 hora', value: 'less_than_1_hour' },
          { text: '1-4 horas', value: '1_4_hours' },
          { text: '4-24 horas', value: '4_24_hours' },
          { text: '1-3 días', value: '1_3_days' },
          { text: '> 3 días', value: 'more_than_3_days' },
        ]"
      />
    </div>
    <div class="mb-3">
      <h1 class="text-gray-900 font-semibold">Sección de imagenes</h1>
      <p class="text-sm text-gray-400 mb-3">
        Introduce las imagenes/videos necesarios para crear tu reporte, se
        bastante especifico con las mismas y recuerda que la calidad es
        importante!
      </p>
      <UiLoader v-if="isLoading" />
      <UiFileInput />
    </div>
    <UiButton
      :disabled="buttonDisabled"
      type="button"
      class="w-full"
      @click="submitReport"
      >Reportar</UiButton
    >
  </div>
</template>

<script setup>
import axios from "axios";
const mapStore = useMapStore();
const fileStore = useFileStore();
const { latitude, longitude, getLocation } = useGeolocation();
const token = useLocalStorage(null, "token");
const { $toast } = useNuxtApp();
const { userInfo } = useFirebaseAuth();
const { addFile, isLoading } = fileStore;

const selectedLatitude = ref(latitude.value);
const selectedLongitude = ref(longitude.value);

watchEffect(() => {
  selectedLatitude.value = mapStore.selectedLocation.lat;
  selectedLongitude.value = mapStore.selectedLocation.lng;
});

const location = computed(() => mapStore.selectedLocationName);
const previewImages = computed(() =>
  fileStore.previewImages.map((image) => image.url)
);
const showTrashIcon = ref(false);

const title = useLocalStorage(null, "reportTitle");
const description = useLocalStorage(null, "reportDescription");
const gravity = useLocalStorage(50, "reportGravity");
const selectedStatus = useLocalStorage(
  { text: "Nuevo", value: "new" },
  "selectedReportStatus"
);
const selectedLeakType = useLocalStorage(
  { text: "Potable", value: "drinkingWater" },
  "selectedLeakType"
);
const selectedImpact = useLocalStorage([], "selectedImpact");

const selectedLeakSize = useLocalStorage(
  { text: "Pequeña", value: "small" },
  "selectedLeakSize"
);
const selectedLeakDuration = useLocalStorage(
  { text: "< 1 hora", value: "less_than_1_hour" },
  "selectedLeakDuration"
);

function statusSelection(status) {
  selectedStatus.value = status;
}

function leakTypeSelection(leak) {
  selectedLeakType.value = leak;
}

function impactSelection(impact) {
  const index = selectedImpact.value.findIndex(
    (item) => item.value === impact.value
  );
  if (index === -1) {
    selectedImpact.value.push(impact);
  } else {
    selectedImpact.value.splice(index, 1);
  }
}

function removeImpact(index) {
  selectedImpact.value.splice(index, 1);
}

function leakSizeSelection(leakSize) {
  selectedLeakSize.value = leakSize;
}

function leakDurationSelection(leakDuration) {
  selectedLeakDuration.value = leakDuration;
}

const form = reactive({
  title: title || null,
  description: description || null,
  gravity: gravity || null,
  status: selectedStatus || null,
  leak: selectedLeakType || null,
  impacts: selectedImpact || null,
  size: selectedLeakSize || null,
  duration: selectedLeakDuration || null,
  images: previewImages || null,
  address: location || null,
  coordinates: {
    latitude: selectedLatitude || null,
    longitude: selectedLongitude || null,
  },
});

const submitReport = async () => {
  if (userInfo.value) {
    try {
      console.log("Enviando solicitud...");
      const response = await axios.post(
        "https://us-central1-atlantes-del-agua.cloudfunctions.net/app/createReport",
        form,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta recibida:", response);

      if (response.data) {
        localStorage.removeItem("reportTitle");
        localStorage.removeItem("reportDescription");
        localStorage.removeItem("reportGravity");
        localStorage.removeItem("selectedReportStatus");
        localStorage.removeItem("selectedLeakType");
        localStorage.removeItem("selectedLeakSize");
        localStorage.removeItem("selectedLeakDuration");
        localStorage.removeItem("selectedImpact");

        $toast.success("Reporte enviado con exito", {
          description:
            "Tu reporte ha sido enviado a las autoridades locales, tan pronto como sea posible, el reporte será atendido.",
        });

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        throw new Error(
          "Ha ocurrido un error con el servidor, vuelva a intentar de nuevo más tarde."
        );
      }
    } catch (error) {
      $toast.error("Ha ocurrido un error", {
        description: `${error.response?.data.error}`,
      });
    }
  } else {
    $toast.error("Por favor accede a tu cuenta", {
      description: "Para crear un reporte, por favor accede a tu cuenta",
    });
  }
};

onMounted(() => {
  getLocation();
});
</script>

<style scoped>
.primary-color {
  color: rgb(255, 255, 255);
  background-image: linear-gradient(
    rgb(91, 129, 214) 0%,
    rgb(65, 97, 200) 100%
  );
}

:hover.primary-color {
  color: rgb(255, 255, 255);
  background-image: linear-gradient(rgb(65, 97, 200) 0%, rgb(61, 84, 184) 100%);
}
</style>
