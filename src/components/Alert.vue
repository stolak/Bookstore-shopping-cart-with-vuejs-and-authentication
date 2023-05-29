<template>
  <div>
    <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="showSuccessAlert">
        <strong>Success!</strong> {{sucessMessage}}.
        <button  @click="dismissAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="showErrorAlert">
        <strong>Fail!</strong> {{errMessage}}.
        <button  @click="dismissAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
  export default {
   computed: {
    ...mapGetters(['showSuccessAlert','showErrorAlert','errMessage','successMessage']),
    
  },
  mounted() {
  
    
  },
    methods: {
    ...mapActions(['resetAlert']),
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      dismissAlert() {
        this.resetAlert()
      }
    }
  }
</script>