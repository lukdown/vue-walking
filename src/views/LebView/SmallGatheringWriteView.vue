<template>
  <div class="home">
    <AppHeader />
    <div class="leb-background">
      <div id="leb-smallgathering-write">
        <h2>소모임</h2>
        <form id="yys-smallgathering-write-form" form v-on:submit.prevent="addGathering" action="">
          <!--사진등록-->
          <div class="leb-upload-box">
            <div id="drop-file" class="leb-drag-file">
              <img src="../../assets/img/gallery.png" alt="파일 아이콘" class="leb-upload-box-image">
              <p class="leb-upload-box-message">사진을 등록해주세요</p>
              <img src="" alt="미리보기 이미지" class="leb-preview">
              <input type="file" id="file-input" style="display: none;">
              <label for="file-input" id="leb-drag-file-label"><img src="../../assets/img/camera.png"></label>
            </div>
          </div>

          <!--소모임 이름-->
          <div id="leb-smallgathering-write-name" class="leb-smallgathering-write-img-right">
            <label for="sname" class="">소모임 이름</label>
            <input type="text" id="sname" v-model="gatheringVo.small_gathering_name" class="leb-smallgathering-write-input-long">
          </div>

          <!--주최자 이름-->
          <div id="leb-smallgathering-write-host-name" class="leb-smallgathering-write-img-right">
            <label for="sgname" class="">주최자 이름</label>
            <input type="text" id="sgname" v-model="gatheringVo.small_gathering_host_name" class="leb-smallgathering-write-input-long">
          </div>

          <!--주최자 연락처-->
          <div id="leb-smallgathering-write-host-number" class="leb-smallgathering-write-img-right">
            <label for="sgname" class="">주최자 연락처</label>
            <input type="text" id="sgname" v-model="gatheringVo.small_gathering_hp" class="leb-smallgathering-write-input-long">
          </div>

          <!--모집인원-->
          <div id="leb-smallgathering-write-required" class="leb-smallgathering-write-img-right">
            <label for="sgname" class="">모집인원</label>
            <input type="text" id="sgname" v-model="gatheringVo.small_gathering_total_personnel">
            <span>명</span>
          </div>

          <!--코스 선택-->
          <div id="leb-smallgathering-write-course-choice" class="leb-smallgathering-write-img-right">
            <span class="">코스선택</span>
            <select name="" v-model="gatheringVo.course_name">
              <option value="" selected disabled hidden>코스를 선택해주세요</option>
              <option v-bind:key="i" v-for="(gatheringVo, i) in courseList" value={{gatheringVo.course_no}}>{{gatheringVo.course_name}}</option>
            </select>
          </div>

          <!--모임 일시-->
          <div id="leb-smallgathering-write-date" class="leb-smallgathering-write-img-right">
            <label for="sgdate" class="">모임일시</label>
            <input type="date" id="sgdate" v-model="gatheringVo.small_gathering_date" class="leb-smallgathering-write-input-long">
          </div>

          <!--신청 마감일-->
          <div id="leb-smallgathering-write-closing-date" class="leb-smallgathering-write-img-right">
            <label for="sglastdate" class="">신청마감일</label>
            <input type="date" id="sglastdate" v-model="gatheringVo.small_gathering_deadline" class="leb-smallgathering-write-input-long">
          </div>

          <!--신청제한-->
          <div id="leb-smallgathering-write-limit" class="leb-smallgathering-write-img-right">
            <span id="leb-smallgathering-write-limit-title">신청제한</span>
            <span id="leb-smallgathering-write-limit-gender-limit">
              <input type="radio" id="rdo-only-male" name="gender-limit" value="male" v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-only-male" id="">남자만</label>
              <input type="radio" id="rdo-only-female" name="gender-limit" value="female" v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-only-female" id="">여자만</label>
              <input type="radio" id="rdo-none" name="gender-limit" value="none" v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-none" id="">제한없음</label>
            </span>

            <span id="leb-smallgathering-write-limit-age-limit">
              <input type="text" id="sg-limit-age-start" value="0" v-model="gatheringVo.small_gathering_age_limit">
              <span>세 ~</span>
              <input type="text" id="sg-limit-age-end" value="0" v-model="gatheringVo.small_gathering_age_limit">
              <span>세</span>
            </span>
          </div>
          <!--모임정보-->
          <div id="leb-smallgathering-write-information">
            <div id="leb-smallgathering-write-information-title">모임정보</div>
            <quill-editor v-model:value="state.content" :options="state.editorOption" @change="onEditorChange($event)"></quill-editor>
          </div>

          <button id="leb-smallgathering-write-button" @click="submit(state, title)">등록</button>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import "@/assets/css/LebCss/SmallGatheringWrite.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import { reactive } from 'vue'

export default {
  name: "YysTestView",
  components: {
    AppFooter,
    AppHeader,
  },
  setup() {
    const state = reactive({
      content: '',
      _content: '',
      editorOption: {
        placeholder: '내용을 입력해주세요...', // placeholder 설정
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
        // more options
      },
      disabled: false
    })

    const onEditorBlur = (quill) => {
      console.log('editor blur!', quill)
    }
    const onEditorFocus = (quill) => {
      console.log('editor focus!', quill)
    }
    const onEditorReady = (quill) => {
      console.log('editor ready!', quill)
    }
    const onEditorChange = ({ quill, html, text }) => {
      console.log('editor change!', quill, html, text)
      state._content = html
    }

    setTimeout(() => {
      state.disabled = true
    }, 2000)

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange }
  },
  props: { title: String },
  data() {
    return {
      gatheringVo:{
        course_name:"",
        small_gathering_name: "",
        small_gathering_host_name: "",
        small_gathering_hp: "",
        small_gathering_date: "",
        small_gathering_deadline: "",
        small_gathering_total_personnel: "",
        small_gathering_gender_limit: "",
        small_gathering_age_limit: "",
      }
    }
  },
  methods: {
    submit(state, title) {
      console.log(state._content)
      console.log(title)
    },


  }
}
</script>
<style>
.ql-toolbar {
  width: 1500px !important;
}

.ql-container {
  width: 1500px !important;
  height: 500px;
}

.ql-editor {
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>