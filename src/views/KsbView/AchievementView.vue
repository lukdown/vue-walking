<template>
  <div>
    <AppHeader />
    <div id="ksb-achieve-All">
      <div id="yys-box">
        <div id="ksb-achieve-subTitle">
          <h2>도전과제</h2>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <span>달성완료 3/9 개</span>
        </div>
        <div id="yys-box2">
          <div id="ksb-achieve-bookArea">
            
            <div id="yys-achieve-List-box">
                <ul class="ksb-achieve-List">
                  <li id="ksb-achieve-imgArea" v-for="item in leftColumn" :key="item.id">
                    <div class="yys-achieve-img">
                      <img src="@/assets/img/치킨.jpg" alt="" class="ksb-achieve-Img" />
                    </div>
                    <div class="ksb-achieve-text">
                      <p>{{ item.challenge_name }}</p>
                      <span>{{ item.challenge_explanation }}</span>
                    </div>
                  </li>
                </ul>
                <ul class="ksb-achieve-List">
                  <li id="ksb-achieve-imgArea" v-for="item in rightColumn" :key="item.id">
                    <div class="yys-achieve-img">
                      <img src="@/assets/img/치킨.jpg" alt="" class="ksb-achieve-Img" />
                    </div>
                    <div class="ksb-achieve-text">
                      <p>{{ item.challenge_name }}</p>
                      <span>{{ item.challenge_explanation }}</span>
                    </div>
                  </li>
                </ul>
              </div>

                <div id="yys-paging-btn">
                  <div class="yys-btn">
                    <button class="yys-arrow-img" v-if="currentPage > 1" @click="currentPage--">이전</button>
                  </div>
                  <span id="yys-btn-center"></span>
                  <div class="yys-btn">
                    <button class="yys-arrow-img" v-if="currentPage < totalPages" @click="currentPage++">다음</button>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>


<script>
import axios from "axios";
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
    return {
      challengeList: [],
      currentPage: 1, // 현재 페이지 번호
      postsPerPage: 6, // 한 페이지에 보여줄 게시글의 개수
    };
  },
  computed: {
    displayedPosts() {
      const startIndex = (this.currentPage - 1) * this.postsPerPage;
      const endIndex = startIndex + this.postsPerPage;
      return this.challengeList.slice(startIndex, endIndex);
    },
    leftColumn() {
      return this.displayedPosts.slice(0, 3);
    },
    rightColumn() {
      return this.displayedPosts.slice(3);
    },
    totalPages() {
      return Math.ceil(this.challengeList.length / this.postsPerPage);
    },
  },
  methods: {
    getchallengeList() {
      console.log("데이터 가져오기");

      axios({
        method: "get", 
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage_challenge_list`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, 
        responseType: "json", 
      })
        .then((response) => {
          console.log(response); 
          this.challengeList = response.data.apiData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getchallengeList();
  },
};
</script>

