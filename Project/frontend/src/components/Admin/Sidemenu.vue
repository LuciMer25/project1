<template>
	<div id="layoutSidenav_nav">
		<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
			<div class="sb-sidenav-menu">
				<div class="nav">
					<div class="sb-sidenav-menu-heading">Home</div>
					<RouterLink to="/admin" class="nav-link">
						<div class="sb-nav-link-icon">
							<i class="fas fa-tachometer-alt"></i>
						</div> 관리자메인화면
					</RouterLink>
					<div class="sb-sidenav-menu-heading">관리목록</div>
					<a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
						data-bs-target="#collapseLayouts" aria-expanded="false"
						aria-controls="collapseLayouts">
						<div class="sb-nav-link-icon">
							<i class="fas fa-columns"></i>
						</div> 회원관리
						<div class="sb-sidenav-collapse-arrow">
							<i class="fas fa-angle-down"></i>
						</div>
					</a>
					<div class="collapse" id="collapseLayouts"
						aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
						<nav class="sb-sidenav-menu-nested nav">
							<RouterLink to="/admin/memberList" class="nav-link" >회원목록</RouterLink>
							<RouterLink to="/admin/qnaList" class="nav-link" >상품Q&A </RouterLink>
							<RouterLink to="/admin/inquiry" class="nav-link" >1:1문의</RouterLink>
						</nav>
					</div>
					<a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
						data-bs-target="#collapsePages" aria-expanded="false"
						aria-controls="collapsePages">
						<div class="sb-nav-link-icon">
							<i class="fas fa-book-open"></i>
						</div> 상품관리
						<div class="sb-sidenav-collapse-arrow">
							<i class="fas fa-angle-down"></i>
						</div>
					</a>
					<div class="collapse" id="collapsePages"
						aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
						<nav class="sb-sidenav-menu-nested nav accordion"
							id="sidenavAccordionPages">
							<RouterLink to="/admin/prodList" class="nav-link collapsed" > 
								상품목록
							</RouterLink>
							<RouterLink to="/admin/prodInsert" class="nav-link collapsed" > 
								상품등록
							</RouterLink>
						</nav>
					</div>
					<a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
						data-bs-target="#pagesCollapseError" aria-expanded="false"
						aria-controls="pagesCollapseError"> 
						<div class="sb-nav-link-icon">
							<i class="fas fa-book-open"></i>
						</div> 주문관리
						<div class="sb-sidenav-collapse-arrow">
							<i class="fas fa-angle-down"></i>
						</div>
					</a>
					<div class="collapse" id="pagesCollapseError"
						aria-labelledby="headingOne"
						data-bs-parent="#sidenavAccordionPages">
						<nav class="sb-sidenav-menu-nested nav">
							<RouterLink to = "/admin/orderList" class="nav-link" >주문 현황</RouterLink> 
							<RouterLink to = "/admin/cancelList" class="nav-link" >취소 현황</RouterLink> 
							<RouterLink to = "/admin/returnList" class="nav-link" >반품 현황</RouterLink>
						</nav>
					</div>
					<div class="sb-sidenav-menu-heading"> </div>
					<RouterLink to="/admin/adminChart" class="nav-link">
						<div class="sb-nav-link-icon">
							<i class="fas fa-chart-area"></i>
						</div> 매출차트
					</RouterLink>
					 <RouterLink to="/admin/notify" class="nav-link" >
						<div class="sb-nav-link-icon">
							<i class="fas fa-table"></i>
						</div> 공지사항
					 </RouterLink>
				</div>
			</div>
			<div class="sb-sidenav-footer">
				<div class="small"></div>
				뚜기두밥
			</div>
		</nav>
	</div>
	</template>
	<script>
	import { RouterLink } from 'vue-router';
	
	export default {
	  name: "Sidemenu",
		data() {
		  return {};
		},
		created() {},
		methods: {}
	};
	</script>
	<style scoped>
	.sb-sidenav-menu .nav-link {
	  padding-left: 10px; 
	}
	
	.sb-sidenav-menu-heading {
	  padding-left: 10px; 
	}
	
	.sb-sidenav .sb-sidenav-menu .nav-link-icon {
	  margin-right: 10px; 
	}
	.sb-sidenav{
		padding-left: 5px;
	}
	</style>