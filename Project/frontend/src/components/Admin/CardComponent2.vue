<template>
  <div class="col-xl-3 col-md-6">
    <div class="card text-white mb-4" :class="bgColor">
      <div class="card-body d-flex align-items-center justify-content-between">
        <div>
          <div class="card-subtitle2" v-if="showSubtitle2">{{ subtitle2 }}</div>
          <div class="card-subtitle3" v-if="showSubtitle3">{{ subtitle3 }}</div>
          <div class="card-subtitle4" v-if="showSubtitle4">지난 7일간 Best Category</div>
          <div class="card-title">{{ column }}</div>
          <div class="card-value">{{ formatCurrency(data) }}원</div>
        </div>
        <div>
          <i :class="icon" class="card-icon"></i>
        </div>
      </div>
      <div class="card-footer d-flex align-items-center justify-content-between">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [String, Number],
      required: true
    },
    column: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'bg-primary'
    },
    icon: {
      type: String,
      default: 'fas fa-users'
    },
    showSubtitle2: {
      type: Boolean,
      default: false
    },
    showSubtitle3: {
      type: Boolean,
      default: false
    },
    showSubtitle4: {
      type: Boolean,
      default: false
    },
    subtitle2: {
      type: String,
      default: ''
    },
    subtitle3: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatCurrency(amount) {
      if (typeof amount !== 'number' && typeof amount !== 'string') {
        return '0';
      }
      const numberAmount = Number(amount);
      if (isNaN(numberAmount)) {
        return '0';
      }
      return numberAmount.toLocaleString();
    }
  }
}
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.card-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}
.card-value {
  font-size: 2rem;
  margin-top: 0.5rem;
}
.card-icon {
  font-size: 3rem;
  opacity: 0.7;
}
.card-footer {
  background: rgba(255, 255, 255, 0.2);
}
</style>