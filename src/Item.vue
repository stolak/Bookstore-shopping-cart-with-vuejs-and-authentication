<template>
  <div class="col-sm-4 item">
    <div class="card text-center">
      <div>
        <img :src="item.thumbnail_url" alt="" class="card-img-top grow" />
      </div>
      <div class="card-body">
        <h5 class="card-title">Title:{{ item.title }}</h5>
        <p class="card-text">{{ item.description | shortDescription }}</p>
        <p class="card-text">Author:{{ item.author}}</p>
        <div class="row">
          <p class="col-6 lead">${{ item.price }}</p>
          <p class="col-6">
            <button
              class="btn btn-success"
              :disabled="item.quantity === 0"
              @click="addToCart(item)"
            >
              Add to cart
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
<div class="col-sm-6 col-lg-4 item">
  <img class="img-fluid" src="assets/img/desk.jpg" />
  <h3 class="name">Hanging desk</h3>
  <p class="description">A desk that has to be mounted to the wall</p>
</div>
-->

<script>
export default {
  name: "item",
  props: ["item"],
  data() {
    return {
      size: "",
    };
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 70) {
        return value.substring(0, 70) + "...";
      } else {
        return value;
      }
    },
  },
  methods: {
    addToCart(item) {
      this.$store.commit("addToCart", item);
    },
  },
};
</script>

<style scoped>
.remain {
  color: #d17581;
}

.grow {
  width: 90%;
  height: 90%;
  padding: 15px;
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.item {
  display: flex;
  content: "";
  padding: 10px 10px;
}
</style>