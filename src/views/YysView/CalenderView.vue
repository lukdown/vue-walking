<template>
    <div>
      <AppHeader />
  
  
  
  
      <div id="wrap">
        <div id="container" >
          <!-- aside 없음 -->
          <div id="full-content">
            <!-- content-head 없음 -->
  
            <div id="index">
  
  
              <div id="greetings">
  
  
  
  
  
  
  
  
  
  
  
  
  
                <div class="yys-title">
                  <h2>코스북</h2>
                </div>
                <div id="yys-contentbox">


                  







                  <div class="tabmenu">
                    <ul>
                      <li id="tab1" class="btnCon">
                        <a class="yys-calender-category-btn" href="#tab1">
                          캘린더
                        </a>
                        <div class="tabCon" >
                          dasds
                        </div>
                        
                      </li>

                      <li id="tab2" class="btnCon">
                        <a class="yys-calender-category-btn" href="#tab2">
                          기록
                        </a>
                        <div class="tabCon" >
                          fdsf
                        </div>
                        
                      </li>    
                      
                    </ul>
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
  
  location.href = "#tab1";
  export default {
    name: 'CalenderView',
    components: {
      AppFooter,
      AppHeader,
    },
    data() {
        return {
        };
    },
    methods: {
    },
    created(){
  
    }
  }
  </script>
  