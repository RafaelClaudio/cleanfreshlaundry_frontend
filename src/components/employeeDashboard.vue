<template>
    <div>
        <v-navigation-drawer v-model="drawer" class="primary_dark" dark app clipped fixed temporary>
            <v-list-item link :to="'/employee/profile'">
                <v-list-item-content>
                    <v-list-item-title class="title">
                        {{employee.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{employee.username}}
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
                    <v-btn block color="error" @click="logout">Logout</v-btn>
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

        <VContent>
            <router-view/>
        </VContent>
    </div>
</template>
 
<script>   
export default {
    data() {
        return {
            drawer: null,
            items: [
                {
                    path: '/manage/order',
                    title: 'Customers Order',
                    icon: 'mdi-basket'
                },
                {
                    path: '/manage/review',
                    title: 'Customers Review',
                    icon: 'mdi-star'
                },
                {
                    path: '/manage/pricelist',
                    title: 'Pricelist Manager',
                    icon: 'mdi-cash-usd'
                },
            ],
            myusername: '',
            employee: ''
        }
    },
    methods:{
        logout() {
            // var uri = this.$apiUrl + '/EmployeeAuth/deleteToken/' + localStorage.getItem("employee_token")
            // this.$http.post(uri).then(response => {
                localStorage.removeItem('employee_token')
                localStorage.removeItem('employee_username')
                this.$router.push({name : "LoginEmployee"})
            // }).catch(error => {
            //     console.log("Logout failed")
            // })
        },
        getEmployee(){
            this.myusername = window.atob(localStorage.getItem("employee_username"));
            var uri = this.$apiUrl + '/employee/oneEmployee/' + this.myusername
            this.$http.get(uri).then(response => {
                //console.log(response.data.message[0])
                this.employee = response.data.message[0]
            })
        }
    },
    mounted(){
        if(!localStorage.getItem("employee_token")){
            this.$router.push({name : 'LoginEmployee'})
        }
        this.getEmployee()
        
    }
}
</script> 
