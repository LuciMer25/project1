<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ item.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ formatDate(item.reg_date) }}
      </v-card-subtitle>
      <v-card-text>
        <v-chip v-if="item.category === '공지'" color="blue" dark>{{ item.category }}</v-chip>
        <v-chip v-else color="grey" dark>{{ item.category }}</v-chip>
      </v-card-text>
      <div v-if="images.length" class="my-4">
        <v-carousel>
          <v-carousel-item v-for="(image, index) in images" :key="index">
            <v-img :src="getImagePath(image)" :alt="image.file_name"></v-img>
          </v-carousel-item>
        </v-carousel>
      </div>
      <v-card-text>
        {{ item.content }}
      </v-card-text>
      <v-card-actions>
        <v-btn v-for="(file, index) in files" :key="index" :href="getFilePath(file)" download>
          {{ file.file_name }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      item: {},
      images: [],
      files: [],
    };
  },
  created() {
    this.notifyInfo();
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async notifyInfo() {
      const { data } = await axios.get(`/api/adminBoard/notifyInfo/${this.$route.params.no}`);
      this.item = data.list[0];
      this.images = data.img;
      this.files = data.files;
      console.log(this.files);
      console.log(this.images);
    },
    getImagePath(image) {
      return `/api/upload/${image.path}/${image.file_name}`;
    },
    getFilePath(file) {
      return `/api/upload/${file.path}/${file.file_name}`;
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}
.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>