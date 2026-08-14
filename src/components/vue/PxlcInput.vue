<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  rows?: number
  required?: boolean
  autocomplete?: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{ label }}<span v-if="required" class="form-label__req" aria-hidden="true">*</span></label>
    <textarea
      v-if="rows"
      :id="id"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :aria-required="required ? 'true' : undefined"
      class="form-textarea"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <input
      v-else
      :id="id"
      :value="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :required="required"
      :aria-required="required ? 'true' : undefined"
      :autocomplete="autocomplete"
      class="form-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
