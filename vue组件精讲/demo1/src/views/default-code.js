// src/views/default-code.js
const code =
  `<template>
    <div>
        <input v-model="message">
        <div>{{ message }}</div>
        
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: ''
            }
        }
    }
</script>`;

export default code;