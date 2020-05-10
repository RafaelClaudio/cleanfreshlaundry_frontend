<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">PRICELIST MANAGER</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon> Add Price Category
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="pricelist" :search="keyword" :loading="load"> <template
                        v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.category }}</td>
                                <td>{{ item.duration }}</td>
                                <td>{{ item.price }}</td>
                                <td class="text-center">
                                    <v-btn icon color="primary_dark" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="warning" light @click="openDeleteDialog(item.id)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template> </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-card>
                <v-card-title> <span class="headline">User Profile</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Category Name*" v-model="form.category" required>
                                    </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Duration*" v-model="form.duration" type="number" required></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Price per kilogram*" v-model="form.price" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container> <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>

                <v-card-text>
                    Delete this data will affect permanently.
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="grey" text @click="deleteDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="error" text @click="deleteData(deleteId)">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            deleteDialog: false,
            dialog: false,
            keyword: '',
            headers: [
                {
                    text: 'No',
                    value: 'no',
                    sortable: false
                }, 
                {
                    text: 'Price Category Name',
                    value: 'category'
                }, 
                {
                    text: 'Duration (day)',
                    value: 'duration'
                }, 
                {
                    text: 'Price per Kilogram',
                    value: 'price'
                },
                {
                    text: 'Settings',
                    value: null,
                    sortable: false
                }
            ],
            pricelist: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                category: '',
                duration: '',
                price: ''
            },
            newprice: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
        }
    },
    methods: {
        getData() {
            var uri = this.$apiUrl + '/pricelist'
            this.$http.get(uri).then(response => {
                this.pricelist = response.data.message
            })
        },
        sendData() {
            this.newprice.append('category', this.form.category);
            this.newprice.append('duration', this.form.duration);
            this.newprice.append('price', this.form.price);
            var uri = this.$apiUrl + '/pricelist'
            this.load = true 
            this.$http.post(uri, this.newprice).then(response => {
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },         
        updateData(){             
            this.newprice.append('category', this.form.category);             
            this.newprice.append('duration', this.form.duration);             
            this.newprice.append('price', this.form.price);             
            var uri = this.$apiUrl + '/pricelist/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.newprice).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();               
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
                this.typeInput = 'new';           
            })         
        },         
        editHandler(item){           
            this.typeInput = 'edit';           
            this.dialog = true;           
            this.form.category = item.category;           
            this.form.duration = item.duration;           
            this.form.price = item.price,           
            this.updatedId = item.id         
        },         
        deleteData(deleteId){ //mengahapus data             
            var uri = this.$apiUrl + '/pricelist/' + deleteId; //data dihapus berdasarkan id 
            this.$http.delete(uri).then(response => {
                this.snackbar = true;
                this.text = response.data.message;
                this.color = 'green'
                this.deleteDialog = false;
                this.getData();
            }).catch(error => {
                this.errors = error 
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        }, 
        setForm() {
            if (this.typeInput === 'new') {
                this.sendData()
            } else {
                //console.log("dddd")
                this.updateData()
            }
        }, 
        resetForm() {
            this.form = {
                category: '',
                duration: '',
                price: ''
            }
        },
        openDeleteDialog(deleteId){
            this.deleteDialog = true
            this.deleteId = deleteId
        },
    }, 
    mounted() {
        if(!localStorage.getItem("employee_token"))
        {
            this.$router.push({name: 'LoginEmployee'})
        }
        this.getData();
    },
} 
</script>