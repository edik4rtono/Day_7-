<template>
  <div>
    <div class="form-group">
      <label class="control-label">{{ label }}</label>
      <input type="text"
            class="form-control"
            :value="value"
            @keyup="$emit('update', $event.target.value)">
      {{ value }}
      <div class="alert alert-danger" v-if="!value.length">
        Anda harus mengisi data
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'value',
  ]
}
</script>
