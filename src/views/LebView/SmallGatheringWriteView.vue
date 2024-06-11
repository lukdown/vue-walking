<template>
  <div class="home">
    <AppHeader />
    <div class="leb-background">
      <div id="leb-smallgathering-write">
        <h2>소모임</h2>
        <form id="yys-smallgathering-write-form" v-on:submit.prevent="addGathering" action="">
          <!--사진등록-->
          <div class="leb-upload-box">
            <div id="drop-file" class="leb-drag-file">
              <img
                v-bind:src="previewImageUrl || `${this.$store.state.apiBaseUrl}/upload/${gatheringVo.small_gathering_saveName}`"
                alt="미리보기 이미지" class="leb-preview">
              <input type="file" id="file-input" style="display: none;" v-on:change="KsbselectFile">
              <label for="file-input" id="leb-drag-file-label"><img src="../../assets/img/camera.png"></label>
            </div>
          </div>

          <!--소모임 이름-->
          <div id="leb-smallgathering-write-name" class="leb-smallgathering-write-img-right">
            <label for="sname" class="">소모임 이름</label>
            <input type="text" id="sname" v-model="gatheringVo.small_gathering_name"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--주최자 이름-->
          <div id="leb-smallgathering-write-host-name" class="leb-smallgathering-write-img-right">
            <label for="sgname" class="">주최자 이름</label>
            <input type="text" id="sgname" v-model="gatheringVo.small_gathering_host_name"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--주최자 연락처-->
          <div id="leb-smallgathering-write-host-number" class="leb-smallgathering-write-img-right">
            <label for="sgname" class="">주최자 연락처</label>
            <input type="text" id="sgname" v-model="gatheringVo.small_gathering_hp"
              class="leb-smallgathering-write-input-long">
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
            <select name="" v-model="gatheringVo.course_no">
              <option value="" selected disabled hidden>코스를 선택해주세요</option>
              <option v-for="(gVo) in courseList" v-bind:key="gVo.course_no" :value="gVo.course_no">
                {{ gVo.course_name }}</option>
            </select>
          </div>

          <!--모임 일시-->
          <div id="leb-smallgathering-write-date" class="leb-smallgathering-write-img-right">
            <label for="sgdate" class="">모임일시</label>
            <input type="date" id="sgdate" v-model="gatheringVo.small_gathering_date"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--신청 마감일-->
          <div id="leb-smallgathering-write-closing-date" class="leb-smallgathering-write-img-right">
            <label for="sglastdate" class="">신청마감일</label>
            <input type="date" id="sglastdate" v-model="gatheringVo.small_gathering_deadline"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--소모임 지역-->
          <div id="leb-smallgathering-write-name" class="leb-smallgathering-write-img-right">
            <label for="sname" class="">소모임 지역</label>
            <input type="text" id="sname" v-model="gatheringVo.small_gathering_region"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--신청제한-->
          <div id="leb-smallgathering-write-limit" class="leb-smallgathering-write-img-right">
            <span id="leb-smallgathering-write-limit-title">신청제한</span>
            <span id="leb-smallgathering-write-limit-gender-limit">
              <input type="radio" id="rdo-only-male" name="gender-limit" value="남자만"
                v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-only-male" id="">남자만</label>
              <input type="radio" id="rdo-only-female" name="gender-limit" value="여자만"
                v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-only-female" id="">여자만</label>
              <input type="radio" id="rdo-none" name="gender-limit" value="제한없음"
                v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-none" id="">제한없음</label>
            </span>

            <span id="leb-smallgathering-write-limit-age-limit">
              <input type="text" id="sg-limit-age-start" value="" v-model="gatheringVo.small_gathering_age_limit_start">
              <span>세 ~</span>
              <input type="text" id="sg-limit-age-end" value="" v-model="gatheringVo.small_gathering_age_limit_end">
              <span>세</span>
            </span>
          </div>
          <!--모임정보-->
          <div id="leb-smallgathering-write-information">
            <div id="leb-smallgathering-write-information-title">모임정보</div>
            <quill-editor v-model="gatheringVo.small_gathering_information" :options="state.editorOption"
              @change="onEditorChange"></quill-editor>
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
import axios from "axios";

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
      state._content = html;
    }

    setTimeout(() => {
      state.disabled = true
    }, 2000)

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange }
  },
  props: { title: String },
  data() {
    return {
      previewImageUrl: null,
      gatheringVo: {
        course_no: "",
        course_name: "",
        small_gathering_name: "",
        small_gathering_host_name: "",
        small_gathering_hp: "",
        small_gathering_date: "",
        small_gathering_deadline: "",
        small_gathering_total_personnel: "",
        small_gathering_region: "",
        small_gathering_gender_limit: "",
        small_gathering_age_limit: "",
        small_gathering_age_limit_start: 0,
        small_gathering_age_limit_end: 0,
        small_gathering_information: "",
      },
      courseVo: {

      },
      courseList: []
    }
  },
  methods: {
    submit(state, title) {
      if (this.gatheringVo.small_gathering_age_limit_start === "" || this.gatheringVo.small_gathering_age_limit_end === "") {
        alert('나이 제한을 입력하세요.');
        return;
      }

      this.gatheringVo.small_gathering_information = state._content;
      console.log(state._content);
      console.log(title);
    },
    KsbselectFile(event) {
      console.log("사진 선택");
      this.file = event.target.files[0];
      if (this.file) {
        this.previewImageUrl = URL.createObjectURL(this.file);
        console.log(this.previewImageUrl);
      }
    },

    addGathering() {
      console.log("파일 업로드");
      console.log(this.gatheringVo);
      const formData = new FormData();
      
      formData.append("file", this.file);
      formData.append("small_gathering_name", this.gatheringVo.small_gathering_name);
      formData.append("small_gathering_host_name", this.gatheringVo.small_gathering_host_name);
      formData.append("small_gathering_hp", this.gatheringVo.small_gathering_hp);
      formData.append("small_gathering_total_personnel", this.gatheringVo.small_gathering_total_personnel);
      formData.append("course_no", this.gatheringVo.course_no);
      formData.append("small_gathering_date", this.gatheringVo.small_gathering_date);
      formData.append("small_gathering_deadline", this.gatheringVo.small_gathering_deadline);
      formData.append("small_gathering_region", this.gatheringVo.small_gathering_region);
      formData.append("small_gathering_gender_limit", this.gatheringVo.small_gathering_gender_limit);

      // 나이 제한이 없을 때 "제한 없음"으로 설정
      if (this.gatheringVo.small_gathering_age_limit_start === 0 && this.gatheringVo.small_gathering_age_limit_end === 0) {
        formData.append("small_gathering_age_limit", "제한 없음");
      } else {
        // 나이 제한이 있을 때 시작 나이와 종료 나이를 문자열로 결합하여 설정
        formData.append("small_gathering_age_limit", `${this.gatheringVo.small_gathering_age_limit_start}~${this.gatheringVo.small_gathering_age_limit_end}`);
      }

      formData.append("small_gathering_information", this.gatheringVo.small_gathering_information);


      
      console.log(formData);
      console.log(formData.get('file'));
      if (this.gatheringVo.small_gathering_name == "") {
        alert("소모임 이름을 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_host_name == "") {
        alert("주최자 이름을 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_hp == "") {
        alert("핸드폰번호를 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_total_personnel == "") {
        alert("모집인원을 입력해 주세요");
      } else if (this.gatheringVo.course_no == "") {
        alert("코스번호를 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_date == "") {
        alert("모임일시를 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_deadline == "") {
        alert("신청마감일을 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_region == "") {
        alert("소모임 지역을 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_gender_limit == "") {
        alert("성별제한을 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_age_limit == null) {
        alert("나이제한을 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_information == "") {
        alert("모임정보를 입력해 주세요");
      } else if (!this.file) {
        alert("모임이미지를 첨부해 주세요");
      } else {
        axios({
          method: 'post', // put, post, delete                   
          url: `${this.$store.state.apiBaseUrl}/api/walking/addgathering`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$store.state.token
          }, //전송타입
          //params: guestbookVo, //get방식 파라미터로 값이 전달
          data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달

          responseType: 'json' //수신타입
        }).then(response => {
          console.log(response.data.apiData); //수신데이타
          this.gatheringVo.small_gathering_saveName = response.data.apiData.saveName;
          this.$router.push({ path: '/walking/smallgatheringpage' });
        }).catch(error => {
          console.log(error);
      });
    }
    },
    getCourseList() {
      console.log("데이터 가져오기");

      axios({
        method: 'post', // put, post, delete 
        url: `${this.$store.state.apiBaseUrl}/api/gathering/courseList`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        //data: this.gatheringVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: 'json' //수신타입
      }).then(response => {
        console.log(response.data.apiData); //수신데이타
        this.courseList = response.data.apiData;

      }).catch(error => {
        console.log(error);

      });
    }


  },
  created() {
    this.getCourseList();
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