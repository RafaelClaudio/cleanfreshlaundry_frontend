<template>
    <div>
        <v-app-bar app fixed clipped-left height="70px" color="primary">
            <img src="../assets/laundrylogo.png" style="height:45px;width:45px" class="ml-5">
            <v-toolbar-title style="font-size: 21px;" class="secondary--text ml-3">
                CLEAN FRESH LAUNDRY
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <router-link v-for="item in items" :key="item.title" link :to="item.path">
                    <v-btn text large color="secondary" class="mt-3">{{ item.title }}</v-btn>
                </router-link>
            </v-toolbar-items>
        </v-app-bar>
        

        <VContent>
            <router-view/>
        </VContent>
    </div>
</template>
 
<script>   
export default {
    data() {
        return {
            items: [
                {
                    path: '/',
                    title: 'Login'
                },
                {
                    path: '/register',
                    title: 'Register'
                },
            ],
        }
    },
    mounted(){
        if(localStorage.getItem("user_token")){
            this.$router.push({name : 'HomeController'})
        }
    }
}
</script> 