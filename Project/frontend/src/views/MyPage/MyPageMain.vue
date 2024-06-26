<template>
  <section>
    <div class="sub-content-head etc-ty2">
      <div class="inner">
        <h3 class="title-t ty5">주문/배송조회</h3>
        <hr />
        <div class="r-side">
            <DataTableComponent :data="order" :columns="orderColumns" />
          <div class="fz-16 color-7"></div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="sub-content-head etc-ty2">
      <div class="inner">
        <h3 class="title-t ty5">상품후기</h3>
        <hr />
        <div class="r-side">
          <div class="fz-16 color-7"></div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="sub-content-head etc-ty2">
      <div class="inner">
        <h3 class="title-t ty5">찜리스트</h3>
        <hr />
        <div class="r-side">
          <div class="fz-16 color-7"></div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="sub-content-head etc-ty2">
      <div class="inner">
        <h3 class="title-t ty5">1:1문의</h3>
        <hr />
        <div class="r-side">
          <div class="fz-16 color-7"></div>
          <div class="container">
            <table class="table table-hover">
              <!-- <thead>
                <tr>
                  <th>문의번호</th>
                  <th>제목</th>
                  <th>작성일자</th>
                  <th>답변상태</th>
                  <th></th>
                </tr>
              </thead> -->
              <tbody>
                <tr
                  :key="i"
                  v-for="(inquiry, i) in inquiryList"
                  @click="goToDetail(inquiry.inquiry_no)"
                >
                  <td>{{ inquiry.inquiry_no }}</td>
                  <td>{{ inquiry.inquiry_title }}</td>
                  <td>{{ inquiry.reg_date }}</td>
                  <td>{{ inquiry.comment_state }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import DataTableComponent from '@/components/Admin/DataTableComponent.vue'

export default {
    components: {
        DataTableComponent
    },
  data() {
    return {
      inquiryList: [],

      order: [],
      orderColumns :['주문번호','상품명','운송장번호','주문일자','주문상태'],
    
    };
  },
  created() {
    this.getInquiryList();
    axios.get('/api/mypageorder')
            .then(res => {
                console.log(res.data);
                this.order = res.data.list.map(item => ({
                    '주문번호': item.order_no,
                    '상품명': `${item.first_prod_name}(외 ${item.prod_cnt}건)`,
                    '운송장번호': item.waybill_no,
                    '주문일자' : item.order_date,
                    '주문상태' : item.order_state
                }));
            })
            .catch(err => console.log(err));

  },
  methods: {
    async getInquiryList() {
      let result = await axios.get(`/api/inquiry`);
      this.inquiryList = result.data;
    },
    goToDetail(inquiry_no) {
      this.$router.push({
        path: "/inquiryInfo",
        query: { inquiry_no: inquiry_no },
      });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
  },
};
</script>
<style scoped>
table * {
  text-align: center;
}
</style>
