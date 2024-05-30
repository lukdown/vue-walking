<template>
  <div class="ds-gallery">
    <!--헤더-->
    <AppHeader />
    <div class="ds-gallery-contents">
      <div class="ds-header">
        <h1 class="ds-gallery-title">갤러리

        </h1>
       
        <button v-on:click="getUserCourses" type="button" class="ds-upload" data-bs-toggle="modal"
          data-bs-target="#uploadModal">
          포스팅등록<i class="material-icons dsWrite">edit_square</i>
        </button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form v-on:submit.prevent="uploadFile" action="" method="" enctype="multipart/form-data">
              <div class="modal-header">
                <h5 class="ds-modal-title" id="uploadModalLabel">사진 등록</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <input name="galleryfile" type="file" class="form-control" multiple @change="onFileChange">
                <div class="ds-photo-infoLabel">사진 소개</div>
                <textarea id="ds-photo-info-text" v-model="gallery_introduce"
                  placeholder="소개글을 입력해주세요.&#10;(50자 이내)"></textarea>
              </div>
              <div class="ds-Course">
                <label for="ds-selectCourse-option" class="ds-select-courseLabel">코스 선택</label>
                <select id="ds-selectCourse-option" v-model="selectedCourseNo">
                  <option disabled value="">선택해 주세요</option>
                  <option v-bind:key="c" v-for="(course, c) in courses" :value="course.course_no">{{ course.course_name
                    }}</option>
                </select>
              </div>
              <div class="ds-modal-footer">
                <button type="button" class="ds-closeBtn" data-bs-dismiss="modal">닫기</button>
                <button class="ds-uploadBtn" type="submit">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Image Modal -->
      <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="ds-imagemodal-content">
            <div class="modal-header">
              <h5 class="ds-image-modal-title" id="imageModalLabel">이미지 크게보기<i class="material-icons dszoom">zoom_in</i></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="ds-main-modal-body">
              <img :src="modalImage" class="img-fluid" alt="...">
            </div>
          </div>
        </div>
      </div> <!-- 이미지모달 -->


      <div class="ds-column">
        <div v-bind:key="i" v-for="(YdsVo, i) in galleryList" class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/프사.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">{{ YdsVo.users_nickname }}</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">military_tech</i>
                <div class="ds-level">{{ YdsVo.challenge_name }}</div>
              </div>
            </div>
          </div>

          <div class="ds-divider"></div>
         
          <div class="ds-MainContents">
            <i class="material-icons dsLocation">location_on</i>
            <p class="ds-date">{{ YdsVo.record_date }}</p>
            <div class="ds-additional-images">
              <div class="ds-main-images">
                <!-- Carousel-->
                <div v-if="YdsVo.tList.length" :id="'carouselExample' + i" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div v-for="(image, index) in YdsVo.tList" :key="index" :class="['carousel-item', { active: index === 0 }]">
                     
                          <img :src="`${this.$store.state.apiBaseUrl}/upload/${image.gallery_saveName}`" class="d-block" alt="..." @click="showImageModal(image)"> 
                      
                      <!-- 사용자가 입력한 내용을 표시하는 부분 -->
                      <!-- <div class="caption">{{ image.caption }}</div> -->
                    </div>
                  </div>


                  <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselExample' + i"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" :data-bs-target="'#carouselExample' + i"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>

              </div>
                
              
              <div class="ds-underPics">
                <p class="ds-shortCmt">{{ YdsVo.gallery_introduce }}</p>
              </div>
              
              <div class="ds-course-info">  
                <p class="ds-subTitle">ㆍ지역: {{ YdsVo.course_region }}</p>
                <p class="ds-totalDistance">ㆍ코스거리: {{ YdsVo.course_length }}km</p>
                <p class="ds-courseLevel">ㆍ난이도: {{ YdsVo.course_difficulty }}</p>  
                <p class="ds-totalTime">ㆍ소요시간: {{ YdsVo.course_time }}</p>
              </div>

            </div>
          </div>
          <div class="ds-divider"></div>
          <div class="ds-icon-bottom">
            <div class="ds-icon-likeGroup">
              <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
              <span class="ds-likesCount">{{ likesCount }}</span>
            </div>
            <div class="ds-course-router">
              <router-link :to="`/walking/coursebook/${list}`">
                코스 상세보기<i class="material-icons dsStroll">emoji_nature</i>
              </router-link>
            </div>
          </div>


        </div><!--/ds-v-bind-walkingComments-->

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/개피곤.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">만성피로A양</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">stroller</i>
                <div class="ds-level">걸음마</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/핫도그.jpg" alt="산책하다가">
          <p class="ds-shortCmt">산책하다가 핫도그 사묵. 넘 맛있었음ㅠㅠ</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.11</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">강남사거리근처</p>
              <p class="ds-totalDistance">코스거리: 0.5km</p>
              <p class="ds-courseLevel">난이도: 쉬움</p>
            </div>
          </div>
          <div class="ds-divider"></div>
          <div class="ds-icon-bottom">
            <div class="ds-icon-likeGroup">
              <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
              <span class="ds-likesCount">{{ likesCount }}</span>
            </div>
            <div class="ds-icon-hitGroup">
              <i class="material-icons dsvisibility">visibility</i>
              <span class="ds-hitsCount">{{ hitsCount }}</span>
            </div>
          </div>


        </div><!--/ds-walkingComments-->


      </div><!--/ds-column-->
      <!-- 푸터 -->
    </div><!-- /ds-gallery-contents-->
    <AppFooter />
  </div><!--/ds-gallery-->
  
</template>


<script>
import '@/assets/css/YdsCss/galleryMain.css';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import axios from 'axios';
import { Modal } from 'bootstrap';
import Compressor from 'compressorjs';
export default {
  name: "DsGalleryView",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      images: [],
      galleryList: [],
      galleryfile: [],
      gallery_introduce: "",
      selectedCourseNo: "",
      galleryImages: [],
      modalImage: '',

      YdsVo: {
        gallery_no: "",
        users_nickname: "",
        challenge_name: "",
        gallery_introduce: "",
        record_date: "",
        course_region: "",
        course_length: "",
        course_time: "",
        course_difficulty: "",
        course_name: "",
        mainImageUrl: "",
        galleryImages: [] // 추가: 여러 이미지를 담을 배열

      },
      courses: [

      ],

      likesCount: 0,
      hitsCount: 0,
      imgWidth: '100%',  // 이미지 너비
      imgHeight: 'auto'  // 이미지 높이

    };
  },
  computed: {

  },
  methods: {

    incrementlikesCount() {
      this.likesCount++;
    },
    navigateAndIncrement(event) {
      event.preventDefault();
      this.incrementHitsCount();
      this.$router.push('/walking/coursebook');
    },
    incrementHitsCount() {
      this.hitsCount++;
    },
    onFileChange(event) {

      if (event.target.files.length > 3) {
        alert("최대 3개의 파일만 선택할 수 있습니다.");
        return;
      }
      this.galleryfile = Array.from(event.target.files).slice(0, 3); // 최대 3개 이미지만 선택;
      //console.log(this.galleryfile);
    },

    getList() {
      console.log("데이터 가져오기");


      axios({
        method: 'get', // put, post, delete 
        url: `${this.$store.state.apiBaseUrl}/api/gallery`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: YdsVo, //get방식 파라미터로 값이 전달
        //data: YdsVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: 'json' //수신타입
      }).then(response => {
        //console.log(response.data.apiData); //수신데이타
        this.galleryList = response.data.apiData;
        console.log(this.galleryList);




      }).catch(error => {
        console.log(error);
      });
    },
    showImageModal(image) {
      this.modalImage = `${this.$store.state.apiBaseUrl}/upload/${image.gallery_saveName}`;
      const imageModal = new Modal(document.getElementById('imageModal'));
      imageModal.show();
    },

    getUserCourses() {
      console.log("회원코스가져오기");
      //console.log(this.$store.state.apiBaseUrl);
      //console.log(this.userNo);
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/gallery/user/${this.$store.state.authUser.users_no}/courses`, // 사용자의 코스 목록을 가져오는 엔드포인트로 변경합니다.
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `Bearer ${this.$store.state.token}`
        },
        responseType: 'json'
      }).then(response => {
        //console.log("다솜언니사랑", response.data.apiData); // 수신 데이터
        this.courses = response.data.apiData; // 코스 목록 데이터를 저장합니다.
      }).catch(error => {
        console.error(error);
      });
    },


    getCourseDetails(courseName) {
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/gallery/course/${courseName}`, // 선택한 코스의 상세 정보를 가져오는 엔드포인트로 변경합니다.
        headers: { "Content-Type": "application/json; charset=utf-8" },
        responseType: 'json'
      }).then(response => {
        console.log(response.data.apiData); // 수신 데이터
        this.selectedCourse = response.data.data; // 선택한 코스의 상세 정보를 저장합니다.
      }).catch(error => {
        console.error(error);
      });
    },
    uploadFile() {
      console.log("클릭");
      console.log("연결됨?");
      //console.log(this.gallery_introduce);
      //console.log(this.userNo);
      //console.log(this.selectedCourseNo);
      //console.log(this.$store.state.authUser.users_no);
      console.log();

      const formData = new FormData();
      //formData.append('galleryfile', this.galleryfile);
      this.galleryfile.forEach(file => {
        console.log(file);
        formData.append('galleryfile', file);
      });
      formData.append('users_no', this.$store.state.authUser.users_no);
      formData.append('course_no', this.selectedCourseNo);
      formData.append('gallery_introduce', this.gallery_introduce);
      console.log(formData);
      axios({
        method: 'post', //put,post,delete
        url: `${this.$store.state.apiBaseUrl}/api/gallery/${this.userNo}/course/${this.selectedCourseNo}`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        //params: { crtPage: this.crtPage, keyword: this.keyword }, //get방식 파라미터로 값이 전달
        data: formData, //이경우는 json이 아님

        responseType: 'json' //수신타입
      }).then(response => {
        console.log(response.data.result); //수신데이타
        console.log(response.data.apiData); //수신데이타

        if (response.data.result == "success") {
          this.saveName = response.data.apiData;
          this.$router.push({ path: '/walking/gallery', query: { saveName: response.data.apiData } })

        } else {
          alert("알수없는 오류");
        }

        //this.images = [];
        console.log("캐러셀에담자");
        if (this.galleryfile.length) {
          const readers = this.galleryfile.map(file => {
            return new Promise((resolve, reject) => {
              new Compressor(file, {
                quality: 0.6, // 이미지 압축 품질 설정
                success(result) {
                  const reader = new FileReader();
                  reader.onload = e => resolve({ url: e.target.result });
                  reader.onerror = reject;
                  reader.readAsDataURL(result);
                  //console.log(result,"fgdsgdsgsdgsgfdsfddf");
                },
                error(error) {
                  reject(error);
                },
              });
            });
          });

          Promise.all(readers).then(results => {
            this.images = results;
            this.selectedFiles = [];
            // 모달 닫기
            const modalElement = document.getElementById('uploadModal');
            const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
            modalInstance.hide();
          })
            .catch(error => {
              console.error('Error reading files:', error);
            });
        } else {
          // 선택한 파일이 없으면 슬라이드를 초기화
          this.images = [];
        }

      }).catch(error => {
        console.log(error);
      });
    }

  },

  created() {
    this.getList();
    //this.getUserCourses();
    //this.getImages();

  },
  mounted() {
    // Bootstrap을 초기화하는 로직을 작성합니다.
    new Modal(document.getElementById('uploadModal'));
  },
};

</script>