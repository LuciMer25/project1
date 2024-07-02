<template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title class="text-h5">
          공지사항 등록
        </v-card-title>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="notify.title" label="제목" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="notify.category"
                :items="categories"
                label="카테고리"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="notify.content"
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
                    <v-btn icon size ="x-small" @click.stop="removeFile(index)">
                      <v-icon size ="x-small">mdi-close</v-icon>
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
                          v-model="file.sort"
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
        notify :{
          title: '',
          content: '',
          category: ''
        },
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
          sort: this.files.length + index + 1,
        }));
        this.files = [...this.files, ...newFiles];
      },
      removeFile(index) {
        this.files.splice(index, 1);
        this.files.forEach((file, idx) => {
          file.sort = idx + 1;
        });
      },
      backBtn() {
        this.$router.push("/admin/notify")
      },
      async addNotice(){
        try{
          const result = await axios.post('/api/adminBoard/notifyInsert', {
            title: this.notify.title,
            content: this.notify.content,
            category: this.notify.category
          });
  
          const noticeNo = result.data.insertId;
          console.log(noticeNo)
          const formData = new FormData();
          this.files.forEach((file, index) => {
            formData.append('files', file.file);
            formData.append(`fileType_${index}`, file.fileType);
            formData.append(`fileOrder_${index}`, file.sort);
          });
  
          await axios.post(`/api/adminBoard/fileInsert1/${noticeNo}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.$swal("공지사항이 등록되었습니다.");
          this.$router.push("/admin/notify");
        } catch (err) {
          console.log(err)
        }
      }
       
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