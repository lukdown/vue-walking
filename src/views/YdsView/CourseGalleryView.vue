<template>
    <div class="ds-gallery">
      <!--헤더-->
      <AppHeader />
      <div class="ds-gallery-contents">
        <div class="ds-course-header">
          <h1 class="ds-gallery-title">코스별 갤러리</h1>
            <h2 class="ds-course-title">
            {{ gallerycourseList[0]?.course_name }}<i class="material-icons dsStroll">emoji_nature</i>
            </h2>
          <router-link to="/walking/gallery" class="ds-maingalButton">
            메인 갤러리<i class="material-icons dsimglib">photo_library</i>
          </router-link>
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
        <div v-bind:key="c" v-for="(YdsVo, c) in gallerycourseList" class="ds-walkingComments">
            <div class="ds-profile-all">
            <img class="ds-profile" :src="`${this.$store.state.apiBaseUrl}/api/gallery/${YdsVo.users_saveName}`" alt="회원프사">
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
                <div v-if="YdsVo.tList && YdsVo.tList.length" :id="'carouselExample' + c" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div v-for="(image, index) in YdsVo.tList" :key="index" :class="['carousel-item', { active: index === 0 }]">
                    
                          <img :src="`${this.$store.state.apiBaseUrl}/upload/${image.gallery_saveName}`" class="d-block" alt="..." @click="showImageModal(image)"> 
                      <!-- {{ image.gallery_saveName }} ================================ -->
                      <!-- 사용자가 입력한 내용을 표시하는 부분 -->
                      <!-- <div class="caption">{{ image.caption }}</div> -->
                    </div>
                  </div>


                  <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselExample' + c"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" :data-bs-target="'#carouselExample' + c"
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
              <i class="material-icons dsfavorite" @click="incrementlikesCount(YdsVo.gallery_no)">favorite</i>
              <span class="ds-likesCount">{{ YdsVo.gallery_likeCount }}</span>
              </div>
            <div class="ds-course-router">
              <router-link :to="`/walking/coursebook/${list}`">
                코스 상세보기<i class="material-icons dsStroll">emoji_nature</i>
              </router-link>
            </div>
          </div>
        </div><!--/ds-v-bind-walkingComments-->           
        </div><!--/ds-column-->
        <!-- 푸터 -->
      </div><!-- /ds-gallery-contents-->
      <AppFooter />
    </div><!--/ds-gallery-->
  </template>
  
  
  <script>
  import '@/assets/css/YdsCss/galleryCourse.css';
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
        gallerycourseList: [],
        galleryfile: [],
        gallery_introduce: "",
        galleryImages: [],
        modalImage: '',
        
        
        YdsVo: {
        gallery_no: "",
        users_nickname: "",
        users_saveName: "",
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
      
        likesCount: 0,
        hitsCount: 0,
        imgWidth: '100%',  // 이미지 너비
        imgHeight: 'auto'  // 이미지 높이
  
      };
    },
    methods: {
     
       
    
      getcList() {
        console.log("데이터 가져오기");
        
        console.log(this.$route.params.courseNo);
        
        axios({
          method: 'get', // put, post, delete 
          url: `${this.$store.state.apiBaseUrl}/api/gallery/${this.$route.params.courseNo}`,
          headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
          //params: YdsVo, //get방식 파라미터로 값이 전달
          //data: YdsVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

          responseType: 'json' //수신타입
        }).then(response => {
          console.log("API 응답 데이터:", response.data.apiData);
          this.gallerycourseList = response.data.apiData;
          console.log(this.gallerycourseList);
        
      

        }).catch(error => {
        console.log(error);
        });      
      },

      incrementlikesCount(galleryNo) {
        console.log("좋아요연결")
        axios({
          method: 'post', // put, post, delete 
          url: `${this.$store.state.apiBaseUrl}/api/gallery/${galleryNo}/like`,
          headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
          //params: YdsVo, //get방식 파라미터로 값이 전달
          data: {
            userNo: this.$store.state.authUser.users_no
          },  //put, post, delete 방식 자동으로 JSON으로 변환 전달

          responseType: 'json' //수신타입
        }).then(response => {
          console.log(response.data.apiData); //수신데이타
          
          console.log("좋아요가 반영되었습니다.");
          this.getcList();
        }).catch(error => {
          console.log(error);
        });
      },
      showImageModal(image) {
        this.modalImage = `${this.$store.state.apiBaseUrl}/upload/${image.gallery_saveName}`;
        const imageModal = new Modal(document.getElementById('imageModal'));
        imageModal.show();
      },
      compressImages() {
        const readers = this.galleryfile.map(file => {
          return new Promise((resolve, reject) => {
            new Compressor(file, {
              quality: 0.6, // 이미지 압축 품질 설정
              success(result) {
                const reader = new FileReader();
                reader.onload = e => resolve({ url: e.target.result });
                reader.onerror = reject;
                reader.readAsDataURL(result);
              },
              error(error) {
                reject(error);
              },
            });
          });
        }); 

        Promise.all(readers)
          .then(images => {
            this.images = images;
          })
          .catch(error => {
            console.error('Image compression failed:', error);
          });
      },    

    
    },
    
    mounted() {
      
    },  
      
  
    created() {
     
      this.getcList();
    }

  }  
  </script>