<template>
  <div class="home">
    <AppHeader />
    <div class="leb-background">
      <div id="leb-smallgathering-write">
        <h2>소모임</h2>
        <form action="" v-on:submit.prevent="gatheringModify">
          <!--사진등록-->
          <div class="leb-upload-box">
            <div id="drop-file" class="leb-drag-file">
              <img
                v-bind:src="previewImageUrl || `${this.$store.state.apiBaseUrl}/upload/${gatheringVo.small_gathering_saveName}`"
                alt="미리보기 이미지" id="leb-preview" class="leb-modify-image">
              <input type="file" id="file-input" style="display: none;" v-on:change="KsbselectFile">
              <label for="file-input" id="leb-drag-file-label"><img src="../../assets/img/camera.png"></label>
            </div>
          </div>
          <input type="hidden" v-model="gatheringVo.small_gathering_no">
          <!--소모임 이름-->
          <div id="leb-smallgathering-write-name" class="leb-smallgathering-write-img-right">
            <label for="sname">소모임 이름</label>
            <input type="text" id="sname" v-model="gatheringVo.small_gathering_name"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--주최자 이름-->
          <div id="leb-smallgathering-write-host-name" class="leb-smallgathering-write-img-right">
            <label for="sgname">주최자 이름</label>
            <input type="text" id="sgname" v-model="gatheringVo.small_gathering_host_name"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--주최자 연락처-->
          <div id="leb-smallgathering-write-host-number" class="leb-smallgathering-write-img-right">
            <label for="sgcontact">주최자 연락처</label>
            <input type="text" id="sgcontact" v-model="gatheringVo.small_gathering_hp"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--모집인원-->
          <div id="leb-smallgathering-write-required" class="leb-smallgathering-write-img-right">
            <label for="sgpersonnel">모집인원</label>
            <input type="text" id="sgpersonnel" v-model="gatheringVo.small_gathering_total_personnel">
            <span>명</span>
          </div>

          <!--코스 선택-->
          <div id="leb-smallgathering-write-course-choice" class="leb-smallgathering-write-img-right">
            <span>코스선택</span>
            <select v-model="gatheringVo.course_no">
              <option value="" selected disabled hidden>코스를 선택해주세요</option>
              <option v-for="(gVo) in courseList" :key="gVo.course_no" :value="gVo.course_no">
                {{ gVo.course_name }}</option>
            </select>
          </div>

          <!--모임 일시-->
          <div id="leb-smallgathering-write-date" class="leb-smallgathering-write-img-right">
            <label for="sgdate">모임일시</label>
            <input type="text" id="sgdate" v-model="gatheringVo.small_gathering_date"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--신청 마감일-->
          <div id="leb-smallgathering-write-closing-date" class="leb-smallgathering-write-img-right">
            <label for="sglastdate">신청마감일</label>
            <input type="text" id="sglastdate" v-model="gatheringVo.small_gathering_deadline"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--소모임 지역-->
          <div id="leb-smallgathering-write-name" class="leb-smallgathering-write-img-right">
            <label for="sglocation">소모임 지역</label>
            <input type="text" id="sglocation" v-model="gatheringVo.small_gathering_region"
              class="leb-smallgathering-write-input-long">
          </div>

          <!--신청제한-->
          <div id="leb-smallgathering-write-limit" class="leb-smallgathering-write-img-right">
            <span id="leb-smallgathering-write-limit-title">신청제한</span>
            <span id="leb-smallgathering-write-limit-gender-limit">
              <input type="radio" id="rdo-only-male" name="gender-limit" value="남자만"
                v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-only-male">남자만</label>
              <input type="radio" id="rdo-only-female" name="gender-limit" value="여자만"
                v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-only-female">여자만</label>
              <input type="radio" id="rdo-none" name="gender-limit" value="제한없음"
                v-model="gatheringVo.small_gathering_gender_limit">
              <label for="rdo-none">제한없음</label>
            </span>

            <span id="leb-smallgathering-write-limit-age-limit">
              <input type="text" id="sg-limit-age-start" v-model="gatheringVo.small_gathering_age_limit_start">
              <span>세 ~</span>
              <input type="text" id="sg-limit-age-end" v-model="gatheringVo.small_gathering_age_limit_end">
              <span>세</span>
            </span>
          </div>

          <!--모임정보-->
          <div id="leb-smallgathering-write-information">
            <div id="leb-smallgathering-write-information-title">모임정보</div>
            <quill-editor :value="gatheringVo.small_gathering_information" :options="state.editorOption"
              @blur="onEditorBlur" @focus="onEditorFocus" @ready="onEditorReady" @input="updateInformation"
              @change="onEditorChange"></quill-editor>
          </div>

          <button id="leb-smallgathering-write-button" @click="submit(state, title)">수정</button>
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
  name: 'SmallGatheringModifyView',
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
    const updateInformation = (value) => {
      state.gatheringVo.small_gathering_information = value;
      console.log("Updated gathering information:", value); // 이 부분을 추가하여 값을 확인합니다.
      // gatheringVo에 할당된 값이 _content에 복사되도록도 추가합니다.
      state._content = value;
    };

    setTimeout(() => {
      state.disabled = true
    }, 2000)

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange, updateInformation }
  },
  data() {
    return {
      previewImageUrl: null,
      gatheringVo: {},
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
      }
    },
    gatheringList() {
      console.log("데이터 가져오기");
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/gathering/modify/${this.$route.params.small_gathering_no}`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        responseType: 'json'
      }).then(response => {
        console.log(response.data.apiData);
        this.gatheringVo = response.data.apiData;

        // small_gathering_age_limit 값을 '-' 기호를 기준으로 분할하여 두 숫자로 나누기
        if (this.gatheringVo.small_gathering_age_limit === "제한 없음") {
          // 제한없음이면 시작 나이와 끝 나이를 0으로 설정
          this.gatheringVo.small_gathering_age_limit_start = 0;
          this.gatheringVo.small_gathering_age_limit_end = 0;
        } else {
          // 제한이 있다면 '-' 기호를 기준으로 분할하여 할당
          const ageLimitArray = this.gatheringVo.small_gathering_age_limit.split('~');
          this.gatheringVo.small_gathering_age_limit_start = ageLimitArray[0]; // 시작 나이
          this.gatheringVo.small_gathering_age_limit_end = ageLimitArray[1]; // 끝 나이
        }

      }).catch(error => {
        console.log(error);
      });
    },
    gatheringModify() {
      console.log("데이터 가져오기");
      console.log(this.gatheringVo);
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("small_gathering_no", this.gatheringVo.small_gathering_no);
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
      } else if (this.gatheringVo.small_gathering_age_limit == "") {
        alert("나이제한을 입력해 주세요");
      } else if (this.gatheringVo.small_gathering_information == "") {
        alert("모임정보를 입력해 주세요");
      } else if (formData.get('file') == null) {
        alert("모임이미지를 첨부해 주세요");
      } else {
        axios({
          method: 'put',
          url: `${this.$store.state.apiBaseUrl}/api/gathering/modify/${this.$route.params.small_gathering_no}`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$store.state.token
          },
          data: formData,
          responseType: 'json'
        }).then(response => {
          console.log(response.data.apiData);
          this.$router.push("/walking/smallgatheringpage");
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
  mounted() {
    console.log("****mounted()*****");
    this.gatheringList();
    console.log(this.gatheringVo);
  },
  created() {

    console.log("****created()*****");
    this.getCourseList();
    console.log(this.gatheringVo);
  }
}
</script>
