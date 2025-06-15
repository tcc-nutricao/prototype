<template>
  <Flex class="block px-1 font-semibold mb-2" :class="classes">
    {{ props.label }}
    <span v-if="props.required" class="text-danger-500 pl-1">
      <strong>*</strong>
    </span>
  </Flex>
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    label: String,
    required: Boolean,
    error: [Array, Boolean],
  })
  const classes = computed(() => [{ 'text-danger-500': props.error }])
</script>