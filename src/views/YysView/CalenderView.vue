<template>
  <div>
    <AppHeader />

    <div id="wrap">
      <div id="container">
        <!-- aside 없음 -->
        <div id="full-content">
          <!-- content-head 없음 -->

          <div id="index">
            <div id="greetings">
              
              
              
              
              
              
              
              <div id="yys-tabs">
                <div id="yys-calender-title">
                  <h2>나의 산책</h2>
                </div>
                <button v-for="(tab, index) in tabs" v-bind:key="{active: currentTab === index}" v-on:click="currentTab = index" id="yys-tabs-btn">{{ tab }}</button>

                <div class="yys-tab-content">
                  <div v-show="currentTab == 0">
                    <FullCalendar :options="calendarOptions" id="calender" />
                  </div>
                  <div v-show="currentTab == 1">
                    tab2 content
                  </div>
                </div>

              </div>








            </div>

            <!-- //greetings -->
            <div class="clear"></div>
          </div>
          <!-- //index -->
        </div>
        <!-- //full-content -->
      </div>
      <!-- //container -->
    </div>
    <!-- //wrap -->

    <AppFooter />
    <!-- //footer -->






















  </div>
</template>
  
  
  
  
<script>
import "@/assets/css/YysCss/CalenderView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";

//location.href = "#tab1";

export default {
  name: "CalenderView",
  components: {
    AppFooter,
    AppHeader,
    FullCalendar,
  },
  data() {
    return {
      currentTab: 0,
      tabs: ['캘린더','기록'],
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          // 헤더에 표시할 툴 바
          start: "prev next today",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay",
        },
        contentHeight: 1000,
        weekend: true,
        locale: "ko",
        events: [
          { title: "Meeting", start: new Date() },
          {
            title: "Meeting",
            start: "2024-05-10 08:00:00",
            end: "2024-05-12 01:00:00",
          },
          { title: "Meeting", start: "2024-05-22 18:00:00", end: "2024-05-23 01:00:00" },
        ],
        eventClick: function (info) {
          Swal.fire({
            title: "일정",
            html:
              "스케줄: " + info.event.title +
              "<br/>일시: " + new Date(info.event.start).toLocaleString().substring(0, 20).replace("/g", ""),
          });
          //alert('스케줄: ' + info.event.title + '\n' + '일시: ' + (info.event.start));

          // change the border color just for fun
        },
      },
    };
  },
  methods: {},
  created() {},
};
</script>
  