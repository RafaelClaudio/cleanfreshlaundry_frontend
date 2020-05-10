<template>
    <section>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center class="mt-10">
              <div class="headline">Register for Clean Fresh Laundry</div>
              </v-flex>
            <v-flex xs8 offset-xs2 class="mt-10">
              <v-card max-width="600" class="align-center">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Name*" v-model="form.name" required>
                        </v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="Phone*" v-model="form.phone" required></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select class="align-center" :items="gender" v-model="form.gender" label="Gender" outlined></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Email*" v-model="form.email" required>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Username*" v-model="form.username" required>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Password*" type="password" v-model="form.password" required>
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container> <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="green lighten-2 mb-5 mr-5" dark large @click="sendData()">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
              @click="snackbar = false"> Close </v-btn>
          </v-snackbar>
        </v-container>
      </section>
</template>

<script>
export default {
    data() {
        return {
            //dialog: false,
            //keyword: '',
            //users: [],
            gender: [
              'Male',
              'Female'
            ],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                name: '',
                phone: '',
                email: '',
                username: '',
                password: '',
                gender: '',
            },
            user: new FormData,
            // typeInput: 'new',
            errors: '',
            updatedId: '',
        }
    },
    methods: {
        // getData() {
        //     var uri = this.$apiUrl + '/user'
        //     this.$http.get(uri).then(response => {
        //         this.users = response.data.message
        //     })
        // },
        sendData() {
            this.user.append('name', this.form.name);
            this.user.append('phone', this.form.phone);
            this.user.append('email', this.form.email);
            this.user.append('username', this.form.username);
            this.user.append('password', this.form.password);
            this.user.append('gender', this.form.gender);
            var uri = this.$apiUrl + '/user'
            this.load = true 
            this.$http.post(uri, this.user).then(response => {
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar  
                //console.log("ini response "+response.data.message)             
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                // var err = response.data.error;
                // if (error != true){
                //   this.resetForm(); 
                // }
                this.load = false;               
                this.dialog = false               
                //this.getData(); //mengambil data user               
                this.resetForm()      
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again '+this.errors;               
                this.color = 'red';               
                this.load = false;           
            })         
        },         
        resetForm() {
            this.form = {
                name: '',
                phone: '',
                email: '',
                username: '',
                password: '',
                gender: '',
            }
        }
    }, 
    mounted() {
      if(localStorage.getItem("user_token")){
        this.$router.push({name : 'HomeController'})
      }
    },
} 
</script>