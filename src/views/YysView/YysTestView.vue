<template>
  <div>
      <AppHeader/>
      <div id="ksb-achieve-All">
          <div id="ksb-achieve-subTitle">
              <h2>도전과제</h2>
              <span>달성완료 20/100 개</span>
          </div>
          <div id="ksb-achieve-bookArea">
              <ul>
                  <li>
                      <div class="ksb-achieve-List">
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>초보자</span>
                                      <p>처음으로 산책을 시작했습니다.</p>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>우왕~ 많이 걸었당~</span>
                                      <p>누적 50Km를 걸었습니다.</p>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>영 수</span>
                                      <p>이틀 연속으로 산책을 나갔습니다.</p>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>프로산책러</span>
                                      <p>누적 500Km를 걸었습니다.</p>
                                  </div>
                              </div>
                              <button id="ksb-prev-btn">이전</button>
                          </div>
                      </div>
                  </li>
                  <li>
                      <div class="ksb-achieve-List">
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>초보자</span>
                                      <p>처음으로 산책을 시작했습니다.</p>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>우왕~ 많이 걸었당~</span>
                                      <p>누적 50Km를 걸었습니다.</p>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>영 수</span>
                                      <p>이틀 연속으로 산책을 나갔습니다.</p>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <div id="ksb-achieve-imgArea">
                                  <img src="" alt="" class="ksb-achieve-Img">
                                  <div class="ksb-achieve-text">
                                      <span>프로산책러</span>
                                      <p>누적 500Km를 걸었습니다.</p>
                                  </div>
                              </div>
                              <button id="ksb-next-btn">다음</button>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      <AppFooter/>
  </div>
</template>


<script>
import "@/assets/css/KsbCss/Achievement.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
export default {
  name: "AchievementView",
  components: {
      AppFooter,
      AppHeader,
  },
  data() {
      return {};
  },
  methods: {},
};
</script>


<style></style>