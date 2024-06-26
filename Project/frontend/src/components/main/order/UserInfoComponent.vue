<template>
  <v-row>
    <v-divider></v-divider>
      <div class="text-h5">주문자 정보</div>
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
      </v-form>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-row>
      <v-col cols="7"><span class="text-left">보내는 분</span></v-col>
      <v-col cols="4"><span v-text="member.name"></span></v-col>
      <v-col cols="7"><span class="text-left">휴대전화</span></v-col>
      <v-col cols="4"><span v-text="member.phone"></span></v-col>
  
      <v-col cols="7"><span class="text-left">이메일</span></v-col>
      <v-col cols="4"><span v-text="member.email"></span></v-col>
    </v-row>
  </v-row>
    
</template>
<script>
import axios from 'axios';

  export default {
    data (){
      return {
        member:{},
        form: false,
        email: null,
        password: null,
        loading: false,
      }
    },
    created(){
      // this.$store.commit('user',{userId:'test'});
      this.getMember();
      
    },
    methods: {  
      async getMember(){
        let result = (await axios.get('/api/account')).data[0];
        this.setMember(result)
        //console.log(result);
      },
      setMember(res){
        this.member = res;
        this.$store.dispatch('updateLoginInfo', this.member);
        // console.log('유저컴포넌트')
        // console.log(this.$store.getters.getUserInfo);
        // console.log(this.member)
      },
      isLogedin(){
        return this.member == null
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>