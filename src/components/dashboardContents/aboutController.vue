<template>
    <div>
        <div>
            <section>
                <v-parallax :src="require('../../assets/blanket.jpg')" height="685">
                <v-container>
                    <v-layout column align-content-end="" justify-end="" class="white--text">
                        <v-row>
                            <v-col class="px-7">
                                <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 800; text-shadow: 3px 2px #000000">Clean Fresh Laundry</h1>
                                <hr class="my-3">
                                <h2 class="white--text mb-2 text-xs-center" style="font-weight: 700; text-shadow: 3px 2px #000000">Amazing Laundry in Babarsari to visit.</h2>
                                <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 400; text-shadow: 2px 2px #000000">Laundry who serve with all my heart. Once you try you will not regret.
                                    The best laundry service number 2 after number 1, we guarantee real cleanliness, speed, and fragrance, without deception. 
                                </div>
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
            </v-container>
        </div>
    </div>
    
    
</template>