<template>
    <div class="mt-10">
        <h2 class="text-md-center">CUSTOMER'S ORDER</h2>
                <v-layout row wrap justify-space-between style="margin:10px">
                    <v-flex xs6 class="text-right ml-4">
                        <v-text-field class="align-center" v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="mr-4">
                        <v-select class="align-center" :items="status_list" v-model="filter" label="Filter by Status" outlined clearable="true"></v-select>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="filteredItems" :search="keyword" :loading="load" sort-by="id" sort-desc="true" class="mx-3"> 
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.phone }}</td>
                                <td>{{ item.address }}</td>
                                <td>{{ item.price_cat }}</td>
                                <td>{{ item.weight }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ item.created_at }}</td>
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
                    </template> 
                </v-data-table>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Update Order</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field label="Username" v-model="form.username" required disabled="">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Phone Number" v-model="form.phone" required disabled="">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea label="Address"
                                        v-model="form.address" rows="3" required disabled></v-textarea>
                                </v-col>
                                <v-col>
                                    <v-select class="align-center" :items="price_cat" v-model="form.price_cat" label="Price Category" outlined disabled=""></v-select>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field type="number" min="0" label="Weight" v-model="form.weight" required disabled="">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Price Total" v-model="form.price" required disabled="">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="5">
                                    <v-select class="align-center" :items="status_list" v-model="form.status" label="Status" outlined></v-select>
                                </v-col>
                            </v-row>
                        </v-container> <small>You can only update the status</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeFormDialog()">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="updateData()">Confirm</v-btn>
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

            <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark
                    text @click="snackbar = false"> Close </v-btn>
            </v-snackbar>
    </div>
                
        
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
                    text: 'ID',
                    value: 'id',
                    width: 61
                },
                {
                    text: 'Username',
                    value: 'username',
                }, 
                {
                    text: 'Phone Number',
                    value: 'phone',
                    sortable: false
                },
                {
                    text: 'Address',
                    value: 'address',
                    sortable: false
                }, 
                {
                    text: 'Price Category',
                    value: 'price_cat'
                }, 
                {
                    text: 'Weight',
                    value: 'weight'
                }, 
                {
                    text: 'Price Total',
                    value: 'price'
                }, 
                {
                    text: 'Status',
                    value: 'status',
                    sortable: false
                }, 
                {
                    text: 'Date Created',
                    value: 'created_at'
                },
                {
                    text: 'Setting',
                    value: null,
                    sortable: false
                }, 
            ],
            orders: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                username: '',
                phone: '',
                address: '',
                price_cat: '',
                weight: '',
                price: '',
                status: ''
            },
            order: new FormData,
            errors: '',
            updatedId: '',
            price_cat: [],
            deleteId: '',
            status_list:[
                'Unprocessed',
                'In Progress',
                'Complete'
            ],
            filter: ''
        }
    },
    computed:{
        filteredItems() {
            return this.orders.filter((i) => {
                return !this.filter || (i.status === this.filter);
            })
        }
    },
    methods: {
        getPricelistData() {
            var uri = this.$apiUrl + '/pricelist'
            this.$http.get(uri).then(response => {
                var price_category = response.data.message
                for (var i=0;i<price_category.length;i++) {
                    this.price_cat.push(price_category[i].category)
                }
                
            })
        },
        getData() {
            var uri = this.$apiUrl + '/order'
            this.$http.get(uri).then(response => {
                this.orders = response.data.message
            })
        },         
        updateData(){  
            this.order = new FormData           
            this.order.append('address', this.form.address);
            this.order.append('price_cat', this.form.price_cat);
            this.order.append('weight', this.form.weight);
            this.order.append('price', this.form.price); 
            this.order.append('status', this.form.status)            
            var uri = this.$apiUrl + '/order/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.order).then(response =>{ 
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
        editHandler(item){                      
            this.dialog = true;  
            this.form.username = item.username;
            this.form.phone = item.phone;         
            this.form.address = item.address;           
            this.form.price_cat = item.price_cat;           
            this.form.weight = item.weight,
            this.form.price = item.price,
            this.form.status = item.status,       
            this.updatedId = item.id         
        },         
        deleteData(deleteId){ //mengahapus data             
            var uri = this.$apiUrl + '/order/' + deleteId; //data dihapus berdasarkan id 
            this.$http.delete(uri).then(response => {
                this.snackbar = true;
                this.text = response.data.message;
                this.color = 'green'
                this.deleteDialog = false;
                this.getData();
            }).catch(error => {
                this.deleteDialog = false;
                this.errors = error 
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                
            })
        }, 
        resetForm() {
            this.form = {
                username: '',
                phone: '',
                address: '',
                price_cat: '',
                weight: '',
                price: '',
                status: ''
            }
            // this.order_status = ''
        },
        openDeleteDialog(deleteId){
            this.deleteDialog = true
            this.deleteId = deleteId
        },
        closeFormDialog(){
            this.dialog = false,
            this.resetForm()
            // this.typeInput = 'new'
        }
    }, 
    mounted() {
        if(!localStorage.getItem("employee_token"))
        {
            this.$router.push({name: 'LoginEmployee'})
        }
        this.getPricelistData();
        this.getData();
    },
} 
</script>