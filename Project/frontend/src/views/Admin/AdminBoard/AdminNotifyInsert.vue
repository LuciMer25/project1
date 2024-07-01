<template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title class="text-h5">
          공지사항 등록
        </v-card-title>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="title" label="제목" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedCategory"
                :items="categories"
                label="카테고리"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="content"
                label="내용 입력 부분"
                rows="10"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-file-input
                label="첨부파일"
                multiple
                @change="onFileChange"
                outlined
              ></v-file-input>
            </v-col>
            <v-col cols="12" v-if="files.length">
              <v-expansion-panels>
                <v-expansion-panel v-for="(file, index) in files" :key="index">
                  <v-expansion-panel-header>
                    {{ file.name }}
                    <v-btn icon small @click.stop="removeFile(index)">
                      <v-icon x-small>mdi-close</v-icon>
                    </v-btn>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="file.name"
                          label="파일명"
                          readonly
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="file.fileType"
                          :items="fileTypes"
                          label="파일타입"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="file.order"
                          type="number"
                          label="순번"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn color="primary" @click="addNotice">등록</v-btn>
              <v-btn color="secondary" @click="backBtn">뒤로가기</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
        categories: ['공지', '일반'],
        selectedCategory: '',
        files: [],
        fileTypes: ['Image', 'PDF', 'txt', 'xls', 'hwp', '기타'],
      };
    },
    methods: {
      onFileChange(event) {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = selectedFiles.map((file, index) => ({
          file,
          name: file.name,
          fileType: '',
          order: this.files.length + index + 1,
        }));
        this.files = [...this.files, ...newFiles];
      },
      removeFile(index) {
        this.files.splice(index, 1);
        // Update the order of remaining files
        this.files.forEach((file, idx) => {
          file.order = idx + 1;
        });
      },
      addNotice() {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('category', this.selectedCategory);
  
        this.files.forEach((fileWrapper, index) => {
          formData.append(`files[${index}][file]`, fileWrapper.file);
          formData.append(`files[${index}][name]`, fileWrapper.name);
          formData.append(`files[${index}][fileType]`, fileWrapper.fileType);
          formData.append(`files[${index}][order]`, fileWrapper.order);
        });
  
        // Replace the URL with your actual endpoint
        axios.post('/api/notice', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => {
          console.log('Notice added successfully:', response.data);
        }).catch(error => {
          console.error('Error adding notice:', error);
        });
      },
      backBtn() {
        // 뒤로가기 로직을 추가하세요
        console.log('뒤로가기');
      },
    },
  };
  </script>
  
  <style scoped>
  .pa-4 {
    padding: 16px;
  }
  .text-h5 {
    font-size: 1.5rem;
  }
  </style>