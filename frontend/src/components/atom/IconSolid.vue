<template>
  <i
    class="fa-solid"
    :class="[
      props.icon,
      { 'text-xl': props.xl },
      { 'text-lg': props.lg },
      { 'text-sm': props.sm },
      { 'text-xs': props.xs },
    ]"
  />
</template>

<script setup>
  const props = defineProps({
    icon: String,
    xs: Boolean,
    sm: Boolean,
    xl: Boolean,
    lg: Boolean,
  })
</script>