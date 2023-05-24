<template>
<body
    id="page-top"
    data-bs-spy="scroll"
    data-bs-target="#mainNav"
    data-bs-offset="57"
  >

 <NavHeader :page="page" :redirect="redirect" />
  <section id="about"  style="padding: 1rem">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 text-center mx-auto">
            <h2 class="section-heading">REGISTER</h2>
            <hr class="my-4" />
          </div>
          <form class="formform" @submit.prevent="register">
            <div class="form-group">
              <label class="text-left">Full name</label>
              <input
                class="form-control"
                v-model="name"	
                placeholder="Enter full name"
              />
            </div>
            <div class="form-group">
              <label class="text-left">email</label>
              <input
                class="form-control"
                v-model="email"	
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label style ="align-left">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Enter Password"
              />
            </div>
            <div class="form-group">
              <label style ="align-left">Cinfirm Password</label>
              <input
                type="password"
                class="form-control"
                v-model="c_password"
                placeholder="Confirm Password"
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
  name: "Register",
  components: {
    NavHeader,
  },
  data() {
    return {
      name: "",
      password: "",
      c_password: "",
      email: ""
    };
  },
  mounted() {
    
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
      const { name, password, c_password, email } = this;
      const res = await fetch(
       this.$store.state.url1+'register',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            password,
            c_password,
            email
          })
        }
      );
      const data = await res.json();
      console.log(data);
      if(data.success){
       localStorage.setItem('token', JSON.stringify(data.data));
      
       this.$store.commit("login", data.data);
       this.$router.push("/Shopping");
       }
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