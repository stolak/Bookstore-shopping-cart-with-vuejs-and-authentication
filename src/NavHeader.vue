<template>
  <header
    class="text-center text-white d-flex masthead"
    v-bind:id="$attrs.page"
  >
    <div class="container my-auto">
      <nav
        class="navbar navbar-light navbar-expand-lg fixed-top"
        id="mainNav"
        style="position: absolute; height: 25%"
      >
        <div class="container">
          <h3>
             SavannahTech
            
          </h3>
          
          <button
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            class="navbar-toggler navbar-toggler-right"
            type="button"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa fa-align-justify"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              
              
              <li class="nav-item"  v-if="isAuthenticated">
                <a class="nav-link" href="shopping" style="color: white"
                  >Shopping</a
                >
              </li>
              <li class="nav-item"
              v-if="isAuthenticated"
              >
                <a class="nav-link" href="authors" style="color: white"
                  >New Author</a
                >
              </li>
              <li class="nav-item"
              v-if="isAuthenticated"
              >
                <a class="nav-link" href="books" style="color: white"
                  >New Book</a
                >
              </li>
              <li class="nav-item" v-if="!isAuthenticated">
                 <a @click="onRegister" class="nav-link">Register</a>
              </li>
              <li class="nav-item"></li>
              <ul class="nav navbar-nav">
                <router-link
                  to="/"
                  tag="li"
                  v-if="!isAuthenticated"
                  class="nav-item"
                  active-class="active"
                >
                  <a @click="onLogin" class="nav-link">Login</a>
                </router-link>
                <li v-if="isAuthenticated" class="li-pointer nav-item">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {{ getUserName() }}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#">Account Settings</a>
                      <a @click="onLogoutClicked" class="dropdown-item"
                        >Logout </a
                      >
                    </div>
                  </div>
                </li>
                <li v-if="isAuthenticated">
                  <ShoppingCart />
                </li>
              </ul>
              
            </ul>
          </div>
        </div>
      </nav>
      
      
    </div>
  </header>
</template>


 <script>
import ShoppingCart from "./ShoppingCart.vue";
export default {
  components: { ShoppingCart },
  name: "NavHeader",
  computed: {
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
  },
  methods: {
    onLogin() {
      window.location = this.$store.state.endpoints.login;
    },
     onRegister() {
      window.location = this.$store.state.endpoints.register;
    },
    onLogoutClicked() {
      this.$store.commit("logout");
      console.log("logout");
    },
    getUserName() {
      return this.$store.state.user.name;
    },
  },
};
</script>