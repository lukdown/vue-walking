<template>
    <div>
        <AppHeader/>

        <AppFooter/>
    </div>
</template>


<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
    name: "RecordView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {};
    },
    methods: {},
};
</script>


<style></style>