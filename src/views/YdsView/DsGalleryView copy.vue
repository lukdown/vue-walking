<template>
  <div class="ds-gallery">
    <!--헤더-->
    <AppHeader />
    <div class="ds-gallery-contents">
      <div class="ds-header">
        <h1 class="ds-gallery-title">갤러리

        </h1>
        <!-- <button class="ds-upload" @click="openModal">
            포스팅등록<i class="material-icons dsWrite">edit_square</i>
          </button> -->
        <button type="button" class="ds-upload" data-bs-toggle="modal" data-bs-target="#uploadModal">
          포스팅등록<i class="material-icons dsWrite">edit_square</i>
        </button>
      </div>




      <!-- Modal -->
      <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form v-on:submit.prevent="uploadGalFile" action="" method="post" enctype="multipart/form-data">
              <div class="modal-header">
                <h5 class="ds-modal-title" id="uploadModalLabel">사진 등록</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <input type="file" class="form-control" multiple @change="onFileChange">
                <div class="ds-photo-infoLabel">사진 소개</div>
                <textarea id="ds-photo-info-text" v-model="shortComment"
                  placeholder="소개글을 입력해주세요.&#10;(50자 이내)"></textarea>
              </div>
              <div class="ds-Course">
                <label for="ds-selectCourse" class="ds-select-courseLabel">코스 선택</label>
                <select id="ds-selectCourse-option" v-model="YdsVo.course_name">
                  <option disabled value="">선택해 주세요</option>
                  <option value="코스1">코스1</option>
                  <option value="코스2">코스2</option>
                </select>
              </div>
              <div class="ds-modal-footer">
                <button type="button" class="ds-closeBtn" data-bs-dismiss="modal">닫기</button>
                <button type="submit" class="ds-uploadBtn" @click="addImages">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      </div>


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
          <img :src="imageSrc" class="ds-main-image" :alt="altText">
          <p class="ds-shortCmt">xx</p>
          <div class="ds-underMain">
            <i class="material-icons dsLocation">location_on</i>
            <p class="ds-date">{{ YdsVo.record_date }}</p>
            <div class="ds-additional-images">
              <router-link to="/walking/coursebook">
                <div v-if="images.length" id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div v-for="(image, index) in images" :key="index"
                      :class="['carousel-item', { active: index === 0 }]">
                      <img :src="image.url" :style="{ width: imgWidth, height: imgHeight }" class="d-inline-block"
                        alt="...">
                      <!-- 사용자가 입력한 내용을 표시하는 부분 -->
                      <div class="caption">dd</div>
                    </div>
                  </div>

                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </router-link>
              <div class="ds-sub-details">
                <p class="ds-subTitle">{{ YdsVo.course_region }}</p>
                <p class="ds-totalDistance">코스거리: {{ YdsVo.course_length }}km</p>
                <p class="ds-courseLevel">난이도: {{ YdsVo.course_difficulty }}</p>
              </div>
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
              <span class="ds-hitsCount">{{ YdsVo.course_hit }}</span>
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

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/소녀갬성.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">소녀갬성</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">directions_walk</i>
                <div class="ds-level">세미산책러</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/벚꽃.jpg" alt="벚꽃데이트">
          <p class="ds-shortCmt">옵빠랑 데이뚜 갔다가 찍었어요 ㅎㅎ</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.12</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">서울벚꽃명소</p>
              <p class="ds-totalDistance">코스거리: 2km</p>
              <p class="ds-courseLevel">난이도: 중간</p>
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

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/프사.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">YoungSoooo</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">military_tech</i>
                <div class="ds-level">프로산책러</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="오리산책이라능">
          <p class="ds-shortCmt">집사모임</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">강남집사모임</p>
              <p class="ds-totalDistance">코스거리: 3km</p>
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

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/눈물.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">눈물1004</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">military_tech</i>
                <div class="ds-level">프로산책러</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/감성산책.jpg" alt="감성산책이라능">
          <p class="ds-shortCmt">난... ㄱ ㅏ끔... 눈물을 흘린 ㄷ ㅏ ....</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">우리의 추억이 어린곳에서</p>
              <p class="ds-totalDistance">코스거리: 8km</p>
              <p class="ds-courseLevel">난이도: 매우 어려움</p>
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



        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/gymrat.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">깁미프로틴</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">directions_walk</i>
                <div class="ds-level">세미산책러</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/길스장.jpg" alt="길스장이라능">
          <p class="ds-shortCmt">외근 끝나고 나가서 산책하다가 길스장이 있길래 1시간정도 운동함</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.01.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">외근나가서 산책</p>
              <p class="ds-totalDistance">코스거리: 3km</p>
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

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/무념무상.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">중복아닌아이디</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">stroller</i>
                <div class="ds-level">걸음마</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/눕짱.jpg" alt="누운사진이라능">
          <p class="ds-shortCmt">동생이 산책가자고 해서 갔다. 역시 집이 최고다.</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.03.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">집근처에서</p>
              <p class="ds-totalDistance">코스거리: 0.3km</p>
              <p class="ds-courseLevel">난이도: 매우 쉬움</p>
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

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/프사.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">YoungSoooo</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">military_tech</i>
                <div class="ds-level">프로산책러</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/개오리.jpg" alt="오리산책이라능">
          <p class="ds-shortCmt">꽥멍</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">선녀탕 근처에서</p>
              <p class="ds-totalDistance">코스거리: 5km</p>
              <p class="ds-courseLevel">난이도: 어려움</p>
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

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/아재프사.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">천마지존</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">military_tech</i>
                <div class="ds-level">프로산책러</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/갓바위.jpg" alt="갓바위라능">
          <p class="ds-shortCmt">자연이 만들어 준 장엄한 바위 형태이다. 얼마나 경이로운가!</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.03.05</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">팔공산근처</p>
              <p class="ds-totalDistance">코스거리: 10km</p>
              <p class="ds-courseLevel">난이도: 매우 어려움</p>
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








        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-profile" src="@/assets/img/이미지없음.jpg" alt="회원프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">황10</div>
              <div class="ds-lvAll">
                <i class="material-icons dslevel">stroller</i>
                <div class="ds-level">걸음마</div>
              </div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-image" src="@/assets/img/칠곡두만지.jpg" alt="범인산책이라능">
          <p class="ds-shortCmt">걸음걸음에서 처음으로 포스팅 해본다. 남계리 산책길인데, 조용히 걷기 좋았다. </p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.01.19</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">남계리 산책코스</p>
              <p class="ds-totalDistance">코스거리: 3km</p>
              <p class="ds-courseLevel">난이도: 보통</p>
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

        <div class="ds-walkingComments">
          <div class="ds-profile-all">
            <img class="ds-adprofile" src="@/assets/img/치킨.jpg" alt="광고프사">
            <div class="ds-profile-detail">
              <div class="ds-nickname">치순이</div>
            </div>
          </div>
          <div class="ds-divider"></div>
          <img class="ds-main-adimage" src="@/assets/img/닭gg.jpg" alt="닭광고라능">
          <p class="ds-shortCmt">걸음걸음 회원들만을 위한 특별할인가!<br>이 구성이 9900원!!</p>

          <div class="ds-divider"></div>
          <div class="ds-icon-bottom">
            <div class="ds-icon-likeGroup">
              <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
              <span class="ds-likesCount">{{ likesCount }}</span>
            </div>
            <button class="ds-ad">AD</button>
          </div>


        </div><!--/ds-walkingComments-->













      </div><!--/ds-column-->
      <!-- 푸터 -->
    </div><!-- /ds-gallery-contents-->
    <AppFooter />
  </div><!--/ds-gallery-->
</template>


<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
import Compressor from 'compressorjs';
import '@/assets/css/YdsCss/galleryMain.css'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  name: "DsGalleryView",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      images: [],
      selectedFile: [],
      galleryList: [],

      YdsVo: {

        users_nickname: "",
        challenge_name: "",
        gallery_introduce: "",
        record_date: "",
        course_region: "",
        course_length: "",
        course_difficulty: ""

      },

      likesCount: 0,
      hitsCount: 0,

    };
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
      this.selectedFiles = Array.from(event.target.files).slice(0, 3); // 최대 3개 이미지만 선택
      console.log(this.selectedFiles);
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
        console.log(response.data.apiData); //수신데이타
        this.galleryList = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    },
    addImages() {
      if (this.selectedFiles.length) {
        const formData = new FormData();
        this.images = []; // 이미지 배열 초기화

        const compressors = this.selectedFiles.map(file => {
          return new Promise((resolve, reject) => {
            new Compressor(file, {
              quality: 0.6, // 이미지 압축 품질 설정
              success(result) {
                // 압축된 이미지를 FormData에 추가
                formData.append('galleryFile', result, result.name); // 'galleryFile'은 서버에서 해당 파일을 받을 때 사용할 이름입니다.
                resolve();
              },
              error(error) {
                reject(error);
              },
            });
          });
        });

        // 모든 이미지를 압축한 후에 FormData를 서버로 전송합니다.
        Promise.all(compressors)
          .then(() => {
            // 추가로 필요한 데이터도 formData에 추가할 수 있습니다.
            formData.append('shortComment', this.YdsVo.gallery_introduce);
            formData.append('courseName', this.YdsVo.course_name);
            
            console.log(formData);
            // 서버로 formData를 전송하여 파일 업로드를 실행합니다.
            axios.post('/api/gallery/upload', formData)
              .then(response => {
                // 파일 업로드가 성공했을 때 실행되는 코드
                console.log('파일 업로드 성공:', response.data);
                // 모달 닫기
                const modalElement = document.getElementById('uploadModal');
                const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
                modalInstance.hide();
              })
              .catch(error => {
                // 파일 업로드 중 에러가 발생했을 때 실행되는 코드
                console.error('파일 업로드 에러:', error);
              });
          })
          .catch(error => {
            console.error('이미지 압축 에러:', error);
          });
      } else {
        // 선택한 파일이 없으면 슬라이드를 초기화
        this.images = [];
      }
    }

  },

  created() {
    this.getList();


  },
  mounted() {
    // Bootstrap을 초기화하는 로직을 작성합니다.
    new Modal(document.getElementById('uploadModal'));
  },
};

</script>