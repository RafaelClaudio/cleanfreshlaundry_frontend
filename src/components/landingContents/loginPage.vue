<template>
    <div>
        <div>
            <section>
                <v-parallax :src="require('../../assets/people_laundry.jpg')" height="685">
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
                                    <span class="headline">Login</span>
                                    </v-card-title>
                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="form.username" label="Username" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="form.password" label="Password" type="password" required></v-text-field>
                                        </v-col>
                                        
                                        </v-row>
                                    </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="align-center" color="primary" @click="userLogin()">LOGIN</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                        
                    </v-layout>
                </v-container>
                
                </v-parallax>
                <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                        @click="snackbar = false"> Close </v-btn>
                </v-snackbar>
            </section>
        </div>
        <div>
            <v-container>
                <div class="mt-5">
                    <v-layout justify-center pt-10>
                        <h1 class="text-md-center">ABOUT US</h1>
                    </v-layout>
                </div>
                <div>
                    <v-layout justify-center py-10>
                        <v-flex xs6 align-self-center="" justify-end mx-5>
                            <h2>Clean Fresh Laundry</h2>
                            <p style="text-align:justify">Clean Fresh Laundry was founded in 2019 by Mr. Budi Setiawan. He set up this laundry
                                with the aim of helping students around the Babarsari campus, so that they could 
                                get laundry with good quality and service at low prices. Currently this laundry already
                                has 30 washing machines that are used with 50 employees who are ready to serve you. 
                                Created based on the web so that students are made easier if they cannot go directly 
                                to our place. You can order online at this website and we will pick you up. 
                                Very simple isn't it? so what are you waiting for? Immediately subscribe to us, 
                                we waiting for your order!
                            </p>
                        </v-flex>
                        <v-flex xs6 mx-5>
                            <v-img src="../../assets/attractive-beauty.jpg" max-width="400px"></v-img>
                        </v-flex>
                    </v-layout>
                </div>
                <div>
                    <v-layout justify-center py-10>
                        <v-flex xs6 mx-5>
                            <v-img src="../../assets/attractive-woman.jpg" max-width="400px"></v-img>
                        </v-flex>
                        <v-flex xs6 align-self-center="" mx-5>
                            <h2>Why you should choose us?</h2>
                            <p style="text-align:justify">Because we are the best laundry in Babarsari. Best in service, cleanliness, and price.
                                Good and fast service make you comfortable, because you can order via the web and also go offline. 
                                We also always guarantee the cleanliness and freshness of your clothes to maintain 
                                the quality of out store. About the price do not doubt. Five star quality at students prices.
                                Are you students? Come on subscribe to us and feel the benefits! 
                            </p>
                        </v-flex>
                    </v-layout>
                </div>
                <!-- <div>
                    <div>
                        <v-layout justify-center pt-5 pb-10>
                            <h1 class="text-md-center">USER'S REVIEW</h1>
                        </v-layout>
                    </div>
                    <div>
                        <v-layout justify-center="">
                            <v-flex xs6 px-2 py-2>
                                <template>
                                    <v-card class="mx-auto elevation-10" color="grey" dark style="max-width: 400px;">
                                        <v-row justify="space-between">
                                            <v-col cols="8">
                                                <v-card-title primary-title>
                                                    <div>
                                                        <div class="headline">Halycon Days</div>
                                                        <div>Ellie Goulding</div>
                                                        <div>(2013)</div>
                                                    </div>
                                                </v-card-title>
                                            </v-col>
                                            <v-img class="shrink ma-2" contain height="125px"
                                                src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                                                style="flex-basis: 125px"></v-img>
                                        </v-row>
                                        <v-divider dark></v-divider>
                                        <v-card-actions class="pa-4">
                                            Rate this album
                                            <v-spacer></v-spacer>
                                            <span class="grey--text text--lighten-2 caption mr-2">
                                                ({{ rating }})
                                            </span>
                                            <v-rating v-model="rating" background-color="white" color="yellow accent-4"
                                                dense half-increments hover size="18"></v-rating>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-flex>
                        </v-layout>
                    </div>
                </div> -->
            </v-container>
        </div>
    </div>
    
    
</template>

<script>   
import { encode } from 'punycode';
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
            user: new FormData,
            errors: '',
            reviews: [],
            displayedReview: [],
        }
    },
    methods: {
        userLogin() {
            this.user.append('username', this.form.username);
            this.user.append('password', this.form.password);
            var uri = this.$apiUrl + '/auth'
            this.load = true 
            this.$http.post(uri, this.user).then(response => {
                this.snackbar = true; //mengaktifkan snackbar  
                //console.log(response.data.data)             
                if(response.data.data)
                {          
                    this.color = 'green'; //memberi warna snackbar               
                    this.text = 'Login Success'; //memasukkan pesan ke snackbar  
                    localStorage.setItem("user_token", response.data.data.token)
                    localStorage.setItem('user_username',window.btoa(response.data.data.user['username']))
                    localStorage.setItem('user_phone',window.btoa(response.data.data.user['phone']))
                    this.$router.push({name : 'HomeController'})
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
        logout() {
            localStorage.removeItem('user_token')
            this.$router.push({name : "LoginPage"})
        },
        getReviewData() {
            var uri = this.$apiUrl + '/review'
            this.$http.get(uri).then(response => {
                this.reviews = response.data.message
            })
        },
        getDisplayedReview(){
            this.getReviewData()
            var index = []
            this.displayedReview = []
            //console.log(this.reviews.length)
            for(var i=0;i<3;i++){
                index.push(Math.floor(Math.random() * 10))
            }
            //console.log(index)
                for (i in this.reviews){
                    //console.log(i)
                    this.displayedReview.push(i)
                    
                }
            //console.log(this.displayedReview)
            
        }
    },
    mounted(){
        if(localStorage.getItem("user_token")){
            this.$router.push({name : 'HomeController'})
        }
        this.getDisplayedReview()
    }
}
</script> 