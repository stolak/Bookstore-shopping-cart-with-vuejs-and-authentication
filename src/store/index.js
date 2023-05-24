import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

// const url = "http://127.0.0.1:8000/api/"; //"http://springboot-productservice-ucllteam15.ucll-ocp-40cb0df2b03969eabb3fac6e80373775-0000.eu-de.containers.appdomain.cloud/products";
// const headers = { Accept: "application/json" };
// const url = "http://predict.xchangebox.com.ng/public/api/"
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    products: [],
    authors: [],
    inCart: [],
    url1 : "http://127.0.0.1:8000/api/", // "http://predict.xchangebox.com.ng/public/api/",
    user: {
      isAuthenticated: false,
      name: "",
      email: "",
      idToken: "",
      accessToken: "",
      partner: false
    },
    endpoints: {
      login: process.env.VUE_APP_AUTH_URL,
      register: 'register',
      partnercheck: process.env.VUE_APP_URL + "/check",
      products: process.env.VUE_APP_URL + "/products",
    },
  },
  getters: {
    products: state => state.products,
    authors: state => state.authors,
    inCart: state => state.inCart,
  },
  mutations: { //synchronous
    setProducts(state, payload) {
      state.products = payload;
    },
    setAuthors(state, payload) {
      state.authors = payload;
    },
    addToCart(state, payload) {
      state.inCart.push(payload);
    },
    removeFromCart(state, item) {
      state.inCart.splice(item, 1);
    },
    logout(state) {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.email = "";
      state.user.token = "";
    },
    login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.name = payload.name;
      state.user.token = payload.token;
      
    },
   
    setUrls(state) {
     
      state.endpoints.login = 'login'
     
    }
  },
  actions: { 
   
    getAuthor({state,commit} ) {
      let furl = state.url1+'authors';
      let accessToken = state.user.token;
      const AuthStr = 'Bearer '.concat(accessToken);
      axios(furl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': AuthStr
        },
        credentials: 'include',
       
      })
        .then(response => {
          commit("setAuthors", response.data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    getProducts({state, commit }) {
      let bookurl = state.url1+'books';
      
      let accessToken = state.user.token;
      
      const AuthStr = 'Bearer '.concat(accessToken);
      axios(bookurl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': AuthStr
        },
        credentials: 'include',
       
      })
        .then(response => {
          commit("setProducts", response.data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    deleteBook(state,id ) {
      let bookurl = state.url1+'books/'+id;
      
      let accessToken = state.state.user.token;
      
      const AuthStr = 'Bearer '.concat(accessToken);
      axios(bookurl, {
        method: 'Delete',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': AuthStr
        },
        credentials: 'include',
       
      })
        .then(response => {
          console.log('Response:', response);
          state.dispatch("getProducts");
          
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    registerAuthor({ state }, obj) {
      let bookurl = state.url1+'authors';
      let accessToken = state.user.token;
      const AuthStr = 'Bearer '.concat(accessToken);
      axios(bookurl, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': AuthStr
        },
        credentials: 'include',
        data: obj
      })
        .then(response => {
          console.log('Response:', response);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    registerBook({ state, dispatch }, obj) {
      let bookurl = state.url1+'books';
      let accessToken = state.user.token;
      const AuthStr = 'Bearer '.concat(accessToken);
      axios(bookurl, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': AuthStr
        },
        credentials: 'include',
        data: obj
      })
        .then(response => {
          console.log('Response:', response);
          dispatch("getProducts");
          
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
  modules: {
  }
})