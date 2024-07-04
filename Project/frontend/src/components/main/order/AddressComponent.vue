<template>
  <v-container>
    <v-row>
      <v-divider></v-divider>
      <div class="text-h5">배송지 정보</div>
      <v-divider></v-divider>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-form>
          <v-checkbox label="주문자와 동일" v-model="form.sameAsOrderer" @change="updateFormWithUserInfo" />
          <v-text-field
            v-model="form.name"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="이름"
            clearable
            @input="emitReceiverInfo"
          ></v-text-field>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.phone"
                label="휴대폰번호"
                maxlength="11"
                class="mr-2"
                clearable @input="emitReceiverInfo"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="form.postalCode"
            readonly
            :rules="[required]"
            label="우편번호"
            @input="emitReceiverInfo"
          >
            <template v-slot:append>
              <v-btn @click="search">주소검색</v-btn>
            </template>
          </v-text-field>

          <v-text-field v-model="form.address" readonly @input="emitReceiverInfo"></v-text-field>
          <v-text-field v-model="form.detailAddress" @input="emitReceiverInfo"></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        phone:"",
        postalCode: "",
        address: "",
        detailAddress: "",
        sameAsOrderer: false,
      },
      loading: false,
      postOpen: false,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    search() {
      new daum.Postcode({
        oncomplete: (data) => {
          let addr = ""; // 주소 변수
          let extraAddr = ""; // 참고항목 변수

          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            if (extraAddr !== "") {
              extraAddr = " (" + extraAddr + ")";
            }
            this.form.detailAddress = extraAddr;
          } else {
            this.form.detailAddress = "";
          }

          this.form.postalCode = data.zonecode;
          this.form.address = addr;
          this.emitReceiverInfo();
        },
      }).open();
    },
    updateFormWithUserInfo() {
      if (this.form.sameAsOrderer) {
        const userInfo = this.getUserInfo;
        this.form.name = userInfo.name;
        this.form.phone = userInfo.phone;
        this.form.postalCode = userInfo.post_no;
        this.form.address = userInfo.post_addr;
        this.form.detailAddress = userInfo.post_detail_list;
        this.emitReceiverInfo();
      } 
    },
    emitReceiverInfo() {
      this.$emit('save-receiver-info', { 
        name: this.form.name,
        phone: this.form.phone,
        postalCode: this.form.postalCode,
        address: this.form.address,
        detailAddress: this.form.detailAddress
      });
    }
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
  align-items: center;
}
</style>
