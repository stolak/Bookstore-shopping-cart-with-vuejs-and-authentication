<template>
  <body
    id="page-top"
    data-bs-spy="scroll"
    data-bs-target="#mainNav"
    data-bs-offset="57"
  >
    <NavHeader :page="page" :redirect="redirect" />
    <section id="about" class="bg-primary">
       <div class="container">
        <div class="row">
          <div class="col-lg-8 text-center mx-auto">
            <h2 class="section-heading">LOGIN</h2>
            <hr class="my-4" />
          </div>
          <form class="formform" @submit.prevent="register">
            <div class="form-group">
              <label class="text-left">Title</label>
              <input
                class="form-control"
                v-model="title"	
                placeholder="Enter Title"
              />
            </div>
            <div class="form-group">
              <label class="text-left">Description</label>
              <input
                class="form-control"
                v-model="description"	
                placeholder="Enter description"
              />
            </div>
            <div class="form-group">
              <label style ="align-left">Author</label>
              <select v-model="author_id" class="form-control">
             <option
              
              v-bind:value="0"
              :key="0"
            >
            -Select-
            </option>
            <option
              v-for="option in authors"
              v-bind:value="option.id"
              :key="option.value"
            >
              {{ option.author }}
            </option>
          </select>
            </div>
            <div class="form-group">
              <label style ="align-left">Date Publish</label>
              <input
                class="form-control"
                v-model="publish_date"
                placeholder="Enter date"
              />
            </div>
            <div class="form-group">
              <label style ="align-left">Price</label>
              <input
                class="form-control"
                v-model="price"
                placeholder="Enter price"
              />
            </div>
            
            <button type="submit" class="btn btn-primary"  value="register">Submit</button>
          </form>
        </div>     
      </div>
    </section>
   
  </body>
</template>

<script>
import NavHeader from "@/NavHeader.vue";
export default {
  components: {
    NavHeader,
  },
  data() {
    return {
      title: "",
      description: "",
      publish_date: "",
      author_id: "",
      price: ""
    };
  },
  mounted() {
    if (!this.$store.state.user.isAuthenticated) {
      this.$router.push("/login");
    }
    this.$store.dispatch("getAuthors");
  },
  computed: {
    authors() {
      return this.$store.state.authors;
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
  },
   methods: {
    async register() {
      const { title, description, publish_date, author_id, price } = this;
      
       this.$store.dispatch("registerBook",{
            title,
            description,
            publish_date,
            author_id,
            price
          });
    }
  }
};
</script>


<style>
@import "../assets/css/bootstrap.min.css";

@import "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800";
@import "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800";
@import "https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic";
@import "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css";

@import "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
@import "https://www.google.com/recaptcha/api.js";
</style>