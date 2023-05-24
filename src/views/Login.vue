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
            <h2 class="section-heading">LOGIN</h2>
            <hr class="my-4" />
          </div>
          <form class="formform" @submit.prevent="login">
            <div class="form-group">
              <label class="text-left">Username</label>
              <input
                class="form-control"
v-model="email"	
                placeholder="Enter email/Username"
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
            <button type="submit" class="btn btn-primary"  value="login">Submit</button>
          </form>
        </div>     
      </div>
       </section>
   </body>
</template>

<script>
import NavHeader from "@/NavHeader.vue";
export default {
  name: "Login",
  components: {
    NavHeader,

  },
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      age: "",
      address: ""
    };
  },
  beforeMount() {
  if (
      this.$store.state.user.isAuthenticated
    ) {
        this.$router.push("/Shopping");
      } 
    
  },
  mounted() {
    let name = this.$route.query.name;
    let email = this.$route.query.email;
    

    let payload = {
      name: name,
      email: email,
    };
console.log(payload)
    

    
  },
   methods: {
    
    async login() {
      const { email, password } = this;
      const res = await fetch(
        this.$store.state.url1+ 'login',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password,
            
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