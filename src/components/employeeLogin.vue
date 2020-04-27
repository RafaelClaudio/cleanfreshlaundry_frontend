<template>
    <div>
        <v-app-bar app fixed clipped-left height="70px" color="primary">
            <img src="../assets/laundrylogo.png" style="height:45px;width:45px" class="ml-5">
            <v-toolbar-title style="font-size: 21px;" class="secondary--text ml-3">
                CLEAN FRESH LAUNDRY
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title style="font-size: 21px;" class="secondary--text mr-3">
                EMPLOYEE EDITION
            </v-toolbar-title>
        </v-app-bar>
        

        <template>
            <section class="mt-10">
                <v-parallax :src="require('../assets/employeeloginbg.jpg')" height="715">
                    <v-container>
                        <v-layout column align-center justify-center class="white--text">
                            <v-row>
                                <v-col cols="7" class="px-7">
                                    <h1 class="white--text mb-2 mt-10 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">Clean Fresh Laundry</h1>
                                    <hr class="my-3">
                                    <h2 class="white--text mb-2 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">Amazing Laundry in Babarsari to visit.</h2>
                                    <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">Laundry who serve with all my heart. Once you try you will not regret.
                                        The best laundry service number 2 after number 1, we guarantee real cleanliness, speed, and fragrance, without deception. 
                                    </div>
                                </v-col>
                                <v-col cols="5" class="px-7">
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Employee Login</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>

                                                    <v-col cols="12">
                                                        <v-text-field v-model="form.username" label="Username" required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="form.password" label="Password" type="password" required>
                                                        </v-text-field>
                                                    </v-col>

                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn class="align-center" @click="employeeLogin">LOGIN</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>

                        </v-layout>
                    </v-container>
                    
                </v-parallax>
                <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark
                        text @click="snackbar = false"> Close </v-btn>
                </v-snackbar>
            </section>
        </template>
    </div>
</template>
 
<script>   
export default {
    data() {
        return {
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                username: '',
                password: ''
            },
            employee: new FormData,
            errors: '',
        }
    },
    methods:{
        employeeLogin() {
            this.employee.append('username', this.form.username);
            this.employee.append('password', this.form.password);
            var uri = this.$apiUrl + '/EmployeeAuth'
            this.load = true 
            this.$http.post(uri, this.employee).then(response => {
                this.snackbar = true; //mengaktifkan snackbar  
                //console.log(response.data.data)             
                if(response.data.data)
                {          
                    this.color = 'green'; //memberi warna snackbar               
                    this.text = 'Login Success'; //memasukkan pesan ke snackbar  
                    localStorage.setItem("employee_token", response.data.data.token)
                    localStorage.setItem('employee_username',window.btoa(response.data.data.user['username']))
                    this.$router.push({name : 'CustomerOrder'})
                    //console.log(window.atob(localStorage.getItem("username")))
                }else
                {             
                    this.color = 'red'; //memberi warna snackbar 
                    this.text = 'Login Failed'
                }
                this.load = false;               
                this.dialog = false                             
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },
        resetForm() {
            this.form = {
                username: '',
                password: ''
            }
        },
    },
    mounted(){
        if(localStorage.getItem("employee_token"))
        {
            this.$router.push({name: 'CustomerOrder'})
        }
    }
}
</script>
