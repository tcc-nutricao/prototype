<template>
    <Flex gap5>
        <Button 
            v-for="(button, index) of buttons" 
            :key="index" 
            :label="button.label"
            :required="button.required"
            :disabled="button.disabled"
            outlined
            class="w-full"
            :class="selectedButton && selectedButton.label === button.label ? 'border-2 font-semibold' : ''"
            :mediumPurple="selectedButton && selectedButton.label === button.label"
            :darkGray="!selectedButton || selectedButton.label !== button.label"
            @click="selectButton(button)" />
    </Flex>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    buttons: Array
})

const emits = defineEmits(['update:modelValue'])

const selectedButton = ref(null)

const selectButton = (button) => {
    selectedButton.value = button
    emits('update:modelValue', button)
}
</script>
