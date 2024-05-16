<template>
    <div>
        <text-editor v-model="content" />
        <button @click="saveHandler">저장하기</button>
    </div>
  </template>
  
  <script>
  import TextEditor from "@/components/common/TextEditor.vue";
  
  export default {
    name: "NoticePost",
  
    components: { TextEditor },
  
    data() {
      return {
        content: "",
      };
    },
  
    methods: {
      saveHandler() {
          // 서버 저장 요청 로직
      }
    },
  
    created() {
      // 수정일 경우 content 값을 넣어주기 위한 로직
      if (수정일경우) {
        this.$api.GET_CONTENT_DATA(this.$route.params.id).then((res) => {
          this.content = res.data.content;
        });
      }
    },
  };
  </script>