<template>
    <section>
        <v-parallax :src="require('../../assets/people_laundry.jpg')" height="685">
                <v-row class="my-10 mx-10">
                    <v-col cols="6" class="mt-10 ml-10">
                        <h1 class="white--text mb-2 mt-10 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">
                            {{employeedata.name}}</h1>
                        <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">
                            {{employeedata.email}}</div>
                        <span style="height: 50px"></span>
                        <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">
                            {{employeedata.username}}</div>
                        <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">
                            {{employeedata.phone}}</div>
                        <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">
                            {{employeedata.gender}}</div>
                    </v-col>
                    <v-col cols="5" class="mt-10 mr-10">
                        <div class="blue--text subheading mb-3 mt-10 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #ffffff" @click="editHandler(employeedata)" hover>
                            <a>Edit Profile</a>
                            </div>
                        <div class="blue--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #ffffff" @click="passdialog = true">
                            <a>Change Password</a>
                            </div>
                    </v-col>
                </v-row>
        </v-parallax>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title> <span class="headline">Edit My Profile</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Name*" v-model="form.name" required>
                                    </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Username*" v-model="form.username" required disabled=""></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Phone*" v-model="form.phone" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email*" v-model="form.email" required disabled="">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select class="align-center" :items="gender" v-model="form.gender" label="Gender" outlined></v-select>
                            </v-col>
                        </v-row>
                    </v-container> <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="updateData()">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="passdialog" persistent max-width="500px">
            <v-card>
                <v-card-title> <span class="headline">Change Password</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Input New Password" v-model="form.password" type="password" required>
                                    </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container> <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="passdialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="updatePassword()">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
    </section>
</template>

<script>
export default {
    data() {
        return {
            passdialog: false,
            dialog: false,
            gender: [
                'Male',
                'Female',
            ],
            employeedata: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                name: '',
                phone: '',
                email: '',
                username: '',
                gender: '',
            },
            employee: new FormData,
            errors: '',
            updatedId: '',
            myusername: '',
        }
    },
    methods: {        
        updateData(){
            this.employee.append('name', this.form.name); 
            this.employee.append('phone', this.form.phone);             
            this.employee.append('email', this.form.email);
            this.employee.append('username', this.form.username);
            this.employee.append('gender', this.form.gender); 
            // console.log(this.employee);
            // console.log(this.employeedata.id)             
            var uri = this.$apiUrl + '/employee/' + this.employeedata.id;             
            this.load = true             
            this.$http.post(uri,this.employee).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getUser(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },
        updatePassword(){
            this.employee.append('password', this.form.password);            
            var uri = this.$apiUrl + '/employee/updatePassword/' + this.employeedata.id;             
            this.load = true             
            this.$http.post(uri,this.employee).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.passdialog = false               
                this.getUser(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },         
        editHandler(employeedata){          
            this.dialog = true;           
            this.form.name = employeedata.name;
            this.form.phone = employeedata.phone;           
            this.form.email = employeedata.email;           
            this.form.username = employeedata.username; 
            this.form.gender = employeedata.gender;         
            this.updatedId = employeedata.id         
        },
        getUser(){
            var uri = this.$apiUrl + '/employee/oneEmployee/' + this.myusername
            this.$http.get(uri).then(response => {
                //console.log(response.data.message[0])
                this.employeedata = response.data.message[0]
            })
        }, 
        resetForm() {
            this.form = {
                name: '',
                phone: '',
                username: '',
                email: '',
                gender: '',
            }
        }
    }, 
    mounted() {
        this.myusername = window.atob(localStorage.getItem("employee_username"));
        this.getUser();
    },
} 
</script>