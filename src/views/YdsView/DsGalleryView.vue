<template>
  <div class="ds-gallery">
    <!--헤더-->
    <AppHeader />
    <div class= "ds-gallery-contents">
      <div class="ds-header">  
        <h1 class="ds-gallery-title">갤러리</h1> 
        <button class="ds-upload" @click="openModal">
          포스팅등록<i class="material-icons dsWrite">edit_square</i></button>
        <div v-if="showModal" class="ds-modal">
          <Content msg = "포스팅모달" />
        </div>
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
              <p class="ds-shortCmt">꽉꽊꽊까까꽈꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">옥녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
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
              <img class="ds-main-image" src="@/assets/img/개오리.jpg" alt="개오리이라능">
              <p class="ds-shortCmt">꽉꽊꽊까멍머머머멍꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">선녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 어려움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="개비틀즈이라능">
              <p class="ds-shortCmt">10초남음</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">집사모임</p>
                  <p class="ds-totalDistance">코스거리: 4km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <p class="ds-shortCmt">꽉꽊꽊까까꽈꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">옥녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
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
              <img class="ds-main-image" src="@/assets/img/개오리.jpg" alt="개오리이라능">
              <p class="ds-shortCmt">꽉꽊꽊까멍머머머멍꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">선녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 어려움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="개비틀즈이라능">
              <p class="ds-shortCmt">10초남음</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">집사모임</p>
                  <p class="ds-totalDistance">코스거리: 4km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <p class="ds-shortCmt">꽉꽊꽊까까꽈꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">옥녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
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
              <img class="ds-main-image" src="@/assets/img/개오리.jpg" alt="개오리이라능">
              <p class="ds-shortCmt">꽉꽊꽊까멍머머머멍꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">선녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 어려움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="개비틀즈이라능">
              <p class="ds-shortCmt">10초남음</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">집사모임</p>
                  <p class="ds-totalDistance">코스거리: 4km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <p class="ds-shortCmt">꽉꽊꽊까까꽈꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">옥녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
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
              <img class="ds-main-image" src="@/assets/img/개오리.jpg" alt="개오리이라능">
              <p class="ds-shortCmt">꽉꽊꽊까멍머머머멍꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">선녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 어려움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="개비틀즈이라능">
              <p class="ds-shortCmt">10초남음</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">집사모임</p>
                  <p class="ds-totalDistance">코스거리: 4km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <p class="ds-shortCmt">꽉꽊꽊까까꽈꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">옥녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
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
              <img class="ds-main-image" src="@/assets/img/개오리.jpg" alt="개오리이라능">
              <p class="ds-shortCmt">꽉꽊꽊까멍머머머멍꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">선녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 어려움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="개비틀즈이라능">
              <p class="ds-shortCmt">10초남음</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">집사모임</p>
                  <p class="ds-totalDistance">코스거리: 4km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <p class="ds-shortCmt">꽉꽊꽊까까꽈꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">옥녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
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
              <img class="ds-main-image" src="@/assets/img/개오리.jpg" alt="개오리이라능">
              <p class="ds-shortCmt">꽉꽊꽊까멍머머머멍꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">선녀탕 근처에서</p>
                  <p class="ds-totalDistance">코스거리: 5km</p>
                  <p class="ds-courseLevel">난이도: 어려움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="개비틀즈이라능">
              <p class="ds-shortCmt">10초남음</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">집사모임</p>
                  <p class="ds-totalDistance">코스거리: 4km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

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
              <img class="ds-main-image" src="@/assets/img/개비틀즈.jpg" alt="개비틀즈이라능">
              <p class="ds-shortCmt">10초남음</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <router-link to="/walking/coursebook">
                  <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
                </router-link>
                <div class="ds-sub-details">
                  <p class="ds-subTitle">집사모임</p>
                  <p class="ds-totalDistance">코스거리: 4km</p>
                  <p class="ds-courseLevel">난이도: 쉬움</p>
                </div>  
              </div>
              <div class="ds-divider"></div>
              <div class="ds-like-bottom">
                <i class="material-icons dsfavorite" v-on:click="likesCount++">favorite</i>
                <span class="ds-likesCount">{{ likesCount }}</span>
              </div>

            
            </div>

            
          </div><!--/ds-column-->
          <!-- 푸터 -->
          <AppFooter />
    </div><!-- /ds-gallery-contents-->   
  </div><!--/ds-gallery-->
</template>


<script>
import '@/assets/css/YdsCss/galleryModal.css'
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
      posts: [
        // 각 게시물은 id, mainImage, comment, date, nickname, likes, additionalImages를 포함하는 객체입니다.
        // 예: { id: 1, mainImage: 'path-to-main-image.jpg', comment: '코멘트', date: '날짜', nickname: '닉네임', likes: 0, additionalImages: ['path-to-additional-image1.jpg', 'path-to-additional-image2.jpg'] }
      ],
      likesCount: 0

    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    incrementlikesCount() {
      this.likesCount++;
    },
    // 이미지 및 정보 업로드 메소드를 여기에 추가하세요.
    created() { }
  },
}  
</script>