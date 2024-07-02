<template>
  <div class="col-xl-3 col-md-6">
    <div class="card text-white mb-4" :class="bgColor">
      <div class="card-body d-flex align-items-center justify-content-between">
        <div>
          <div class="card-title">{{ column }}</div>
          <div class="card-value">{{ data }}명</div>
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
    }
  }
}
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
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