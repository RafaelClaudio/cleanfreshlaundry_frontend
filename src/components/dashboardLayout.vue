<template>
    <div>
        <v-navigation-drawer v-model="drawer" class="primary_dark" dark app clipped fixed temporary>
            <v-list-item link :to="'/user/profile'">
                <v-list-item-content>
                    <v-list-item-title class="title">
                        {{user.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{user.username}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block color="error" @click="logout()">Logout</v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar dark app fixed clipped-left height="70px" color="primary_dark darken-1">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-3"></v-app-bar-nav-icon>

            <VSpacer />
            <v-toolbar-title style="font-size: 21px;" class="white--text">
                CLEAN FRESH LAUNDRY
            </v-toolbar-title>
            <img src="../assets/laundrylogo.png" style="height:45px;width:45px" class="ml-4 mr-6">
        </v-app-bar>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark
                text @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
        <VContent>
            <router-view/>
        </VContent>
    </div>
</template>
 
<script>   
export default {
    data() {
        return {
            myusername: '',
            drawer: null,
            items: [
                {
                    path: '/user/order',
                    title: 'My Order',
                    icon: 'mdi-basket'
                },
                {
                    path: '/user/pricelist',
                    title: 'Pricelist',
                    icon: 'mdi-cash-usd'
                },
                {
                    path: '/user/review',
                    title: 'User Review',
                    icon: 'mdi-star'
                },
                {
                    path: '/home/about',
                    title: 'About Us',
                    icon: 'mdi-information-variant'
                },
            ],
            user: '',
            snackbar: false,
            color: null,
            text: '',
        }
    },
    methods:{
        logout() {
            var uri = this.$apiUrl + '/auth/deleteToken/' + localStorage.getItem("user_token")
            this.$http.post(uri).then(response => {
                localStorage.removeItem('user_token')
                localStorage.removeItem('user_username')
                localStorage.removeItem('user_phone')
                this.$router.push({name : "LoginPage"})
            }).catch(error => {
                console.log("Logout failed")
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'red'; //memberi warna snackbar               
                this.text = 'Logout Failed'; //memasukkan pesan ke snackbar    
            })
        },
        getUser(){
            this.myusername = window.atob(localStorage.getItem("user_username"));
            var uri = this.$apiUrl + '/user/oneUser/' + this.myusername
            this.$http.get(uri).then(response => {
                //console.log(response.data.message[0])
                this.user = response.data.message[0]
            })
        }
    },
    mounted(){
        if(!localStorage.getItem("user_token")){
            this.$router.push({name : 'LoginPage'})
        }
        this.getUser()
        
    }
}
</script> 