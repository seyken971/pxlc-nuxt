<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  rows?: number
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{ label }}</label>
    <textarea
      v-if="rows"
      :id="id"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      class="form-textarea"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <input
      v-else
      :id="id"
      :value="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="form-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
