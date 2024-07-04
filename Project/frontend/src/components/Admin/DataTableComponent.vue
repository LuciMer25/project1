<template>
  <v-card-text>
    <v-data-table
      :headers="tableHeaders"
      :items="data"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="column in columns" :key="column" @click="gotoInfo(column, item)">
            <span v-if="column === '이미지'">
              <img :src="`/api/upload/${item['이미지']}`" alt="이미지" />
            </span>
            <span v-else-if="isDateColumn(column)">
              {{ formatDate(item[column]) }}
            </span>
            <span v-else>
              {{ item[column] }}
            </span>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" icon="mdi-alert">
          조회 정보가 없습니다.
        </v-alert>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
export default {
  name: 'DataTableComponent',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    tableHeaders() {
      return this.columns.map(column => ({ text: column, value: column }));
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    isDateColumn(column) {
      const dateColumns = ['주문일자', '취소요청일자', '반품요청일자', '작성일'];
      return dateColumns.includes(column);
    },
    gotoInfo(column, row) {
      let pageName = '';

      switch (column) {
        case '상품명':
          if (row.hasOwnProperty('주문일자')) {
            pageName = 'orderList';
          } else if (row.hasOwnProperty('취소요청일자')) {
            pageName = 'cancelList';
          } else if (row.hasOwnProperty('반품요청일자')) {
            pageName = 'returnList';
          }
          break;
        case 'Q&A제목':
          pageName = 'qnaList';
          break;
        case '문의제목':
          pageName = 'inquiry';
          break;
        default:
          return;
      }
      if (pageName) {
        this.$router.push(`/admin/${pageName}`);
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
.text-center {
  text-align: center;
}
.no-data {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
</style>