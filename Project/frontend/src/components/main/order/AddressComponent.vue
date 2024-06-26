<template>
    <v-row>
      <v-divider></v-divider>
        <div class="text-h5">배송지 정보</div>
      <v-divider></v-divider>
    </v-row>
    <v-row v-if="!isLogedin">
      <v-col cols="12" >
        <v-form
          v-model="form"
        >
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Email"
            clearable
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            label="Password"
            placeholder="Enter your password"
            clearable
          ></v-text-field>
          <br>
          <VueDaumPostcode :options="options" />
        </v-form>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="7" align="left"><span class="text-left">받는 분</span></v-col>
      <v-col cols="4" align="center"><span v-text="member.name"></span></v-col>
      <v-col cols="7" align="left"><span class="text-left">배송지</span></v-col>
      <v-col cols="4" align="center"><span v-text="address"></span></v-col>
  
      <v-col cols="7" align="left"><span class="text-left">연락처</span></v-col>
      <v-col cols="4" align="center"><span v-text="member.phone"></span></v-col>
    </v-row>
    <!-- <v-row v-else>
      <v-row>
        <v-col cols="7"><span class="text-left">받는 분</span></v-col>
        <v-col cols="4"><span v-text="member.name"></span></v-col>
        <v-col cols="7"><span class="text-left">휴대전화</span></v-col>
        <v-col cols="4"><span v-text="member.phone"></span></v-col>
    
        <v-col cols="7"><span class="text-left">이메일</span></v-col>
        <v-col cols="4"><span v-text="member.email"></span></v-col>
      </v-row>
    </v-row> -->
      
  </template>
  <script>
 // import axios from 'axios';
  import { VueDaumPostcode } from "vue-daum-postcode"
    export default {
      data (){
        return {
          member:{},
          form: false,
          email: null,
          password: null,
          loading: false,
          addr:{
            post_addr: null,
            post_no: null,
            post_detail_list: null
          },
          address: null,
          postOpen: false
        }
      },
      components:{VueDaumPostcode},
      created(){
        // this.$store.commit('user',{userId:'test'});
        //this.getMember();
        console.log('배송지 컴포넌트');
        console.log(this.$store.getters.getUserInfo);
        //this.member = this.$store.getters.getUserInfo;
      },
      computed: {
        userInfo() {
          return this.$store.getters.getUserInfo;
        },
        address(){
          return `${this.member.post_addr} ${this.member.post_detail_list} (${this.member.post_no})`
        }
      },
      watch: {
        userInfo(newUserInfo) {
          this.member = newUserInfo;
        }
      },
      methods: {  
        
        isLogedin(){
          return this.member == null
        },
        required (v) {
          return !!v || 'Field is required'
        },
        search:function(){
            this.postOpen = true
        },
        oncomplete:function(result){
            if(result.userSelectedType === 'R'){  // 도로명 주소 선택
                this.address = result.roadAddress;
            }else{  // 지번 주소 선택
                this.address = result.jibunAddress;
            }
            this.postOpen = false
            }
        },
    }
  </script>
  