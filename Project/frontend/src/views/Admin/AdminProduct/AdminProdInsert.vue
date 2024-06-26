<template>
    	<div class="tab-content">
			<!-- 상품등록 -->
			<div class="tab-pane active" id="itemInsert_1">
				<div class="form-group" style="">
					<h3>대분류</h3>
					<select class="form-control" name="item_catemain"
						id="item_catemain" title="상품 대분류">
						<option>선택</option>
							<option></option>
					</select>
					<h3>소분류</h3>
					<select class="form-control" name="item_catesub" id="item_catesub"
						title="상품 소분류">
					</select>
				</div>
				<hr class="divider-w mt-10 mb-20">
				<div class="form-group">
					<h3>상품명</h3>
					<input class="form-control input-lg" type="text" placeholder="상품명"/>
				</div>
				<hr class="divider-w mt-10 mb-20">
				<div class="form-group">
					<h3>판매가</h3>
					<input class="form-control input-lg" type="number" placeholder="판매가 / 단위 : 원"/>
				</div>
				<hr class="divider-w mt-10 mb-20">
				<!-- 상품내용 에디터 -->
				<div class="form-group">
					<h3>상품내용</h3>
					<textarea class="form-control input-lg" placeholder="내용을 입력하세요"></textarea>

				</div>
				<!-- 상품등록 끝-->

				<!--  상품이미지 -->
				<div class="tab-pane" id="itemInsert_3">
					<div class="form-group">
						<h3>메인이미지 ( 썸네일 )</h3>
						<input type="file" />
					</div>

					<div class="form-group">
						<h3>내용이미지</h3>
						<input type="file" />
					</div>
					<div id="imgs"></div>
					<hr />
					<button type="submit" id="addBtn">상품등록</button>

				</div>
			</div>
		</div>



</template>