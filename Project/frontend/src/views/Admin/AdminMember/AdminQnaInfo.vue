<template>
    <div class="container">
      <div class="row">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" class="text-center table-primary">QnA번호</th>
              <td scope="col" class="text-center">{{ qnaInfo.qna_no }}</td>
              <th scope="col" class="text-center table-primary">제목</th>
              <td scope="col" class="text-center"><input v-model="qnaInfo.qna_title" disabled cols="170" rows="25"></td>
              <th scope="col" class="text-center table-primary">작성일자</th>
              <td scope="col" class="text-center">{{ qnaInfo.reg_date }}</td>
              <th scope="col" class="text-center table-primary">작성자</th>
              <td scope="col" class="text-center">{{ qnaInfo.user_id }}</td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colspan="7"><img :src="`/api/upload/${qnaInfo.qna_img}`" alt="첨부파일"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="8" class="text-center" valign="top" height="200">
                <pre style="white-space: pre-wrap; border: none; background-color: white;">
                  <textarea v-model="qnaInfo.qna_content" disabled></textarea>
                </pre>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="text-center">
                <pre style="white-space: pre-wrap; border: none; background-color: white;">
                  <textarea v-model="qnaInfo.reply_content"></textarea>
                </pre>
              </td>
            </tr>
            <tr>
              <th scope="col" class="text-center table-primary">답변 작성일</th>
              <td colspan="3" class="text-center">{{ qnaInfo.reply_reg_date }}</td>
              <td class="text-center">
                <button v-if="!qnaInfo.reply_reg_date" class="btn btn-xs btn-info" @click="addReply">등록</button>
                <button v-if="qnaInfo.reply_reg_date" class="btn btn-xs btn-info" @click="updateReply">수정</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      qnaInfo: {}
    };
  },
  created() {
    const no = this.$route.params.no;
    console.log(no);
      axios.get(`/api/adminBoard/adminQnaInfo/${no}`)
      .then(res => {
          this.qnaInfo = res.data.list[0];
          console.log(res.data);
      })
  },
  methods: {
    async addReply() {
      try{
        let res = await axios.post(`/api/adminBoard/qnaReplyInsert`, {
          qnaNo : this.qnaInfo.qna_no,
          content : this.qnaInfo.reply_content
        });
        
        res = await axios.put(`/api/adminBoard/qnaStateUpdate`, {
          qnaNo : this.qnaInfo.qna_no
        });
        alert("답변이 등록되었습니다.");
        this.$router.go(this.$router.currentRoute)

      } catch (err) {
        console.log(err)
      }

    },
    async updateReply() {
      try{
        let res = axios.put(`/api/adminBoard/qnaReplyUpdate`, {
          qnaNo : this.qnaInfo.qna_no,
          content : this.qnaInfo.reply_content
        })
        .then(()=> {
          alert("답변이 수정되었습니다.");
          this.$router.go(this.$router.currentRoute)

        })
      } catch (err) {
        console.log(err)
      }
      
    }
  }
};
</script>