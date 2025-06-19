<template>
  <Flex items-center class="rounded-lg border text-sm overflow-hidden h-[42px]" :class="classes">
    <slot name="pre-icon" />
    <slot name="input">
      <input
        class="px-2 grow border-none bg-none focus:outline-none focus:ring-0 text-gray-700"
        :class="{ 'text-danger-500': props.error }"
        v-model="displayValue"
        @input="handleInput"
        @keydown.enter.prevent="emitEnter"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :min="props.min"
        :max="props.max" />
    </slot>
    <slot name="pos-icon" />
  </Flex>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

import { useUtils } from '../../composables/useUtils'
// Composables
const { applyMask } = useUtils()
// Props
const props = defineProps({
  modelValue: [String, Number],
  type: String,
  error: [Boolean, Array],
  disabled: Boolean,
  placeholder: String,
  min: String,
  max: String,
  mask: String, // Prop opcional para definir a máscara
})
// Data
const localValue = ref(props.modelValue)
const displayValue = ref(applyMask(localValue.value, props.mask))
// const displayValue = ref(localValue)
// Manipula entrada do usuário
const handleInput = (event) => {
  displayValue.value = applyMask(event.target.value, props.mask)
}
// Emits
const emits = defineEmits(['update:modelValue'])
const emitEnter = () => {
  emits('enter')
}
// Computed
const classes = computed(() => ({
  'border-danger-500': props.error,
  'text-danger-500': props.error,
  'bg-slate-200': props.disabled,
  'border-slate-400': !props.error
}))
// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
    if (newValue) {
      displayValue.value = applyMask(newValue, props.mask)
    } else {
      displayValue.value = null
    }
  }
)

watch(displayValue, (newValue) => {
  // const rawValue = newValue.replace(/\D/g, '') // Mantém apenas números
  emits('update:modelValue', newValue)
})
</script>