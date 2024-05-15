<template>
  <div class="ds-gallery">
    <!--헤더-->
    <AppHeader />
    <div class="ds-gallery-contents">
      <div class="ds-header">
        <h1 class="ds-gallery-title">갤러리</h1>
          <button class="ds-upload" @click="openModal">
            포스팅등록<i class="material-icons dsWrite">edit_square</i>
          </button>          
      </div>

      <div v-if="showModal" class="ds-overlay"></div>
      <div v-if="showModal" class="ds-modal">
        <form v-on:submit.prevent="onSubmit" action="<!-- 폼 데이터를 처리할 서버의 URL을 지정 -->" method="<!-- HTTP 메소드 -->">
          <div class="ds-upload-pic">
            <button class="ds-close" v-on:click="closeModal">
              <i class="material-icons dsCancel">cancel</i>
            </button>
            <div class="ds-upload-title">사진 등록</div>

            <div class="ds-photo-input-all">
              <label for="ds-photo-input" class="ds-photo-label">
                <i class="material-icons dsCamera">add_a_photo</i>
                <span>사진을</span>
                <br>
                <span>등록해주세요</span>              
                <input id="ds-photo-input" v-on:change="uploadPic" type="file" style="display: none;">
              </label>
              
              <div class="ds-nextPhoto">
                <label for="ds-photo-info" class="ds-photo-infoLabel">사진 소개</label>
                <textarea id="ds-photo-info-input" v-model="courseVo.info" placeholder="소개글을 입력해주세요.
                &#10;(50자 이내)"></textarea>

                <label for="ds-selectCourse" class="ds-select-courseLabel">코스 선택</label>
                <select id="ds-selectCourse-option" v-model="courseVo.course">
                  <option disabled value="">선택해 주세요</option>
                  <option value="코스1">코스1</option>
                  <option value="코스2">코스2</option>
                </select>
                <button class="ds-modalupload-button" type="submit">
                  <i class="material-icons dsUpload">upload</i> 등록하기
                </button>
              </div> <!-- ds-nextPhoto -->  
            </div> <!-- /ds-photo-input-all -->            
          </div>
        </form>
      </div>

      <div class="ds-column">
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
          <img class="ds-main-image" src="@/assets/img/오리산책.jpg" alt="오리산책이라능">
          <div class="ds-underMain">
            <p class="ds-shortCmt">오리가족도 산책 나왔다.</p>
            <i class="material-icons dsLocation">location_on</i>
            <p class="ds-date">2024.05.09</p>
            <div class="ds-additional-images">
              <router-link to="/walking/coursebook">
                <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
              </router-link>
              <div class="ds-sub-details">
                <p class="ds-subTitle">옥녀탕 근처에서</p>
                <p class="ds-totalDistance">코스거리: 5km</p>
                <p class="ds-courseLevel">난이도: 쉬움</p>
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
              <span class="ds-hitsCount">{{ hitsCount }}</span>
            </div>
          </div>


        </div><!--/ds-walkingComments-->

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
          <img class="ds-main-image" src="@/assets/img/오리산책.jpg" alt="오리산책이라능">
          <p class="ds-shortCmt">오리가족도 산책 나왔다.</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">옥녀탕 근처에서</p>
              <p class="ds-totalDistance">코스거리: 5km</p>
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
          <img class="ds-main-image" src="@/assets/img/오리산책.jpg" alt="오리산책이라능">
          <p class="ds-shortCmt">오리가족도 산책 나왔다.</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">옥녀탕 근처에서</p>
              <p class="ds-totalDistance">코스거리: 5km</p>
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
            <button class="ds-ad">Ad</button>
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
          <img class="ds-main-image" src="@/assets/img/오리산책.jpg" alt="오리산책이라능">
          <p class="ds-shortCmt">오리가족도 산책 나왔다.</p>
          <i class="material-icons dsLocation">location_on</i>
          <p class="ds-date">2024.05.09</p>
          <div class="ds-additional-images">
            <router-link to="/walking/coursebook">
              <img src="@/assets/img/코스예시.jpg" alt="추가 이미지" @click="navigateAndIncrement">
            </router-link>
            <div class="ds-sub-details">
              <p class="ds-subTitle">옥녀탕 근처에서</p>
              <p class="ds-totalDistance">코스거리: 5km</p>
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







      </div><!--/ds-column-->
      <!-- 푸터 -->
    </div><!-- /ds-gallery-contents-->
    <AppFooter />
  </div><!--/ds-gallery-->
</template>


<script>
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
      showModal: false,
      courseVo: {
        info: null,
        course: null
      },
      posts: [
        // 각 게시물은 id, mainImage, comment, date, nickname, likes, additionalImages를 포함하는 객체입니다.
        // 예: { id: 1, mainImage: 'path-to-main-image.jpg', comment: '코멘트', date: '날짜', nickname: '닉네임', likes: 0, additionalImages: ['path-to-additional-image1.jpg', 'path-to-additional-image2.jpg'] }
      ],
      likesCount: 0,
      hitsCount: 0,

    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
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
    uploadPic() {
      console.log("사진업로드");

      //const file = event.target.files[0];
      // 이제 'file' 변수를 사용하여 선택된 파일을 처리.
      // 예를 들어, 파일을 읽거나 서버에 업로드하는 등의 작업을 수행.
    },

    created() { }
  },
}  
</script>