<template>
    <div class="home">
      <AppHeader/>
        <div id="leb-smallgathering-write">
          <h2>소모임</h2>
          <form action="">
            <!--사진등록-->
            <div class="leb-upload-box">
              <div id="drop-file" class="leb-drag-file">
                <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일 아이콘" class="leb-upload-box-image">
                <p class="leb-upload-box-message">사진을 등록해주세요</p>
                <img src="" alt="미리보기 이미지" class="leb-preview">
              </div>
            </div>

            <!--소모임 이름-->
            <div>
                <label for="sname" class="">소모임 이름</label>
                <input type="text" id="sname" value="" placeholder="소모임 이름을 입력해주세요">
            </div>

            <!--주최자 이름-->
            <div>
                <label for="sgname" class="">주최자 이름</label>
                <input type="text" id="sgname" value="" placeholder="주최자 이름을 입력해주세요">
            </div>

            <!--주최자 연락처-->
            <div>
                <label for="sgname" class="">주최자 연락처</label>
                <input type="text" id="sgname" value="" placeholder="연락처를 입력해주세요">
            </div>
            
            <!--모집인원-->
            <div>
                <label for="sgname" class="">모집인원</label>
                <input type="text" id="sgname" value="">
                <span>명</span>
            </div>

            <!--코스 선택-->
            <div id="">
                <span class="">코스선택</span>
                <select name="">
                  <option value="" selected disabled hidden>코스를 선택해주세요</option>
                  <option value="veryeasy">수빈코스</option>
                  <option value="easy">다솜코스</option>
                  <option value="general">영수코스</option>
                  <option value="hard">종희코스</option>
                  <option value="veryhard">은빈코스</option>
                </select>
            </div>

            <!--모임 일시-->
            <div>
                <label for="sgdate" class="">모임일시</label>
                <input type="text" id="sgdate" value="">
            </div>

            <!--신청 마감일-->
            <div>
                <label for="sglastdate" class="">신청마감일</label>
                <input type="text" id="sglastdate" value="">
            </div>

            <!--신청제한-->
            <div>
                <div id="">
                <span class="">신청제한</span>
                <label for="rdo-only-male" id="">남자만</label>
                <input type="radio" id="rdo-only-male" name="gender-limit" value="male">
                <label for="rdo-only-female" id="">여자만</label>
                <input type="radio" id="rdo-only-female" name="gender-limit" value="female">
                <label for="rdo-none" id="">제한없음</label>
                <input type="radio" id="rdo-none" name="gender-limit" value="none">
                <input type="text" id="sg-limit-age-start" value="">
                <span>세 ~</span>
                <input type="text" id="sg-limit-age-end" value="">
                <span>세</span>
              </div>
            </div>

            <!--모임정보-->
            <div>
              <div>모임정보</div>
              <textarea name="" id="" cols="30" rows="10">글쓰기 api</textarea>
            </div>

            <button>등록</button>
          </form>
        </div>
      <AppFooter/>
    </div>
  </template>
  
  <script>
  import "@/assets/css/LebCss/SmallGatheringWrite.css";
  import AppFooter from "@/components/AppFooter.vue";
  import AppHeader from "@/components/AppHeader.vue";
  export default {
    name: 'SmallGatheringWriteView',
    components: {
      AppFooter,
      AppHeader,
    }
  }
  </script>
  