import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

const url = "http://127.0.0.1:8000/api/"; //"http://springboot-productservice-ucllteam15.ucll-ocp-40cb0df2b03969eabb3fac6e80373775-0000.eu-de.containers.appdomain.cloud/products";
const headers = { Accept: "application/json" };

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    products: [],
    authors: [],
    inCart: [],
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
      console.log(payload);
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
    SET_PARTNER(state, partner) {
      state.user.partner = partner;
    },
    setUrls(state) {
      state.endpoints.partnercheck = process.env.VUE_APP_URL + "/check";
      state.endpoints.products = process.env.VUE_APP_URL + "/products";
      state.endpoints.login = process.env.VUE_APP_AUTH_URL
      console.log(process.env);
    }
  },
  actions: { //asynchronous
    async getProducts(state) {
      console.log(url);
      const products = await fetch(url+'books', { headers });
      const prods = await products.json();
      console.log(prods.data);
      state.commit("setProducts", prods.data);
      console.log(prods.data);
    },
    async getAuthor(state) {
      console.log(url);
      const res = await fetch(url+'authors', { headers });
      const authors = await res.json();
      console.log(authors.data);
      state.commit("setAuthors", authors.data);
      console.log(authors.data);
    },
    
    registerAuthor({ state }, obj) {
      let bookurl = url+'authors';
      console.log(bookurl);
      let accessToken = state.user.token;
      const AuthStr = 'Bearer '.concat(accessToken);
      console.log(AuthStr);
      console.log(obj);
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
    registerBook({ state }, obj) {
      let bookurl = url+'books';
      console.log(bookurl);
      let accessToken = state.user.token;
      const AuthStr = 'Bearer '.concat(accessToken);
      console.log(AuthStr);
      console.log(obj);
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
  },
  modules: {
  }
})