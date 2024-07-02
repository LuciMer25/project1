<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="text-h5">
        공지사항 수정
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
                  {{ file_name }}
                  <v-btn icon size ="x-small" @click.stop="removeFile(index)">
                    <v-icon size="x-small">mdi-close</v-icon>
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
            <v-btn color="primary" @click="updateNotice">수정</v-btn>
            <v-btn color="primary" @click="deleteNotice">삭제</v-btn>
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
      notify : {
        title: '',
        content: '',
        category: ''
      },
      categories: ['공지', '일반'],
      selectedCategory: '',
      files: [],
      fileTypes: ['Image', 'PDF', 'txt', 'xls', 'hwp', '기타'],
      removedFiles : []
    };
  },
  created() {
    this.notifyInfo();
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
      const removedFile = this.files.splice(index, 1)[0];
      if (removedFile.no) {
        this.removedFiles.push(removedFile.no);
        console.log(this.removedFiles);
      }
      this.files.forEach((file, idx) => {
        file.sort = idx + 1;
      });
    },
    async notifyInfo() {
      const no = this.$route.params.no;
      try {
        const { data } = await axios.get(`/api/adminBoard/notifyAdminInfo/${no}`);
        if (data.list && data.list.length > 0) {
          this.notify = data.list[0];
        }
        if (data.files) {
          this.files = data.files.map((file, index) => ({
            no : file.file_no,
            name: file.file_name,
            fileType: file.file_type,
            sort: file.sort,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    },
    backBtn() {
      this.$router.push("/admin/notify")
    },
    async updateNotice() {
      const no = this.$route.params.no;
      try {
        await axios.put(`/api/adminBoard/notifyUpdate/${no}`, this.notify);
        if (this.removedFiles.length) {
          for (const fileNo of this.removedFiles) {
          await axios.delete(`/api/adminBoard/fileDelete/${fileNo}`);
          }
        }
        for (const file of this.files) {
          if (!file.no) {
            const formData = new FormData();
            formData.append('file', file.file);
            formData.append('fileType', file.fileType);
            formData.append('fileOrder', file.sort);
            
            await axios.post(`/api/adminBoard/fileInsert/${no}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          } else {
            await axios.put(`/api/adminBoard/fileUpdate/${file.no}`, file);
          }
        }
        this.$swal("수정되었습니다.");
      } catch (err) {
        console.log(err);
      }
    },
    deleteNotice(){
      const no = this.$route.params.no
      console.log(this.no)
      axios.delete(`/api/adminBoard/notifyDelete/${no}`)
      .then(() => {
        this.$swal("삭제되었습니다.");
        this.$router.push("/admin/notify");
      })
      
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