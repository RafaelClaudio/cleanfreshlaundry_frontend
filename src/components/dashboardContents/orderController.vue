<template>
        <v-card class="mx-4 my-3 px-7 py-7" elevation="5">
                <h2 class="text-md-center">MY ORDER</h2>
                <v-layout row wrap justify-space-between style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 pl-10>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon> Add New Order
                        </v-btn>
                    </v-flex>
                    
                </v-layout>

                <v-data-table :headers="headers" :items="orders" :search="keyword" :loading="load" sort-by="id" sort-desc="true"> 
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.address }}</td>
                                <td>{{ item.price_cat }}</td>
                                <td>{{ item.weight }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ item.created_at }}</td>
                                <td class="text-center">
                                    <v-btn icon color="primary_dark" light v-if="item.status=='Complete'" @click="printInvoice(item.id)">
                                        <v-icon>mdi-file-download-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon color="primary_dark" light v-if="item.status=='Unprocessed'" @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="warning" light v-if="item.status=='Unprocessed'" @click="openDeleteDialog(item.id)">
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
                        <span class="headline" v-if="typeInput=='new'">Add New Order</span>
                        <span class="headline" v-else>Edit Order</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Address*" v-model="form.address" required>
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-select class="align-center" :items="price_cat" v-model="form.price_cat" label="Price Category" outlined>
                                    </v-select>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field type="number" min="0" label="Weight*" v-model="form.weight" required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Price Total" v-model="totalPrice" required disabled="">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container> <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeFormDialog()">Close</v-btn>
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

            <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark
                    text @click="snackbar = false"> Close </v-btn>
            </v-snackbar>
        </v-card>
        
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
                }, 
                {
                    text: 'Address',
                    value: 'address'
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
                    value: 'status'
                }, 
                {
                    text: 'Date Created',
                    value: 'created_at'
                },
                {
                    text: 'Setting',
                    value: null
                }, 
            ],
            orders: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                address: '',
                price_cat: '',
                weight: '',
                price: ''
            },
            user: null,
            order: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            pricelist: [],
            price_cat: [],
            order_status : '',
            deleteId: '',
            myusername: '',
            myphone: '',
        }
    },
    computed:{
        totalPrice: function(){
            var price = ''
            for (var i=0;i<this.price_cat.length;i++){

                if(this.price_cat[i] == this.form.price_cat){
                    price = parseInt(this.pricelist[i])
                }
            }
            this.form.price = parseInt(this.form.weight)*parseInt(price)
            if (price == '' || this.form.weight == ''){
                return 0
            }else{
                return this.form.price
            }
            
        }
    },
    methods: {
        getPricelistData() {
            var uri = this.$apiUrl + '/pricelist'
            this.$http.get(uri).then(response => {
                var price_category = response.data.message
                for (var i=0;i<price_category.length;i++) {
                    this.price_cat.push(price_category[i].category)
                    this.pricelist.push(price_category[i].price)
                }
                
            })
        },
        getData() {
            var uri = this.$apiUrl + '/order/userOrder/' + this.myusername
            this.$http.get(uri, {headers: {'Authorization':localStorage.getItem("user_token")}}).then(response => {
                this.orders = response.data.message
            })
        },
        sendData() {
            var getPayloadUri = this.$apiUrl + '/auth'
            this.$http.get(getPayloadUri, {header: {'Authorization': localStorage.getItem("user_token")}})
            .then(response => {
                //console.log(response)
            })
            this.order = new FormData
            this.order_status = 'Unprocessed'
            this.order.append('username', this.myusername);
            this.order.append('phone', this.myphone);  
            this.order.append('address', this.form.address);
            this.order.append('price_cat', this.form.price_cat);
            this.order.append('weight', this.form.weight);
            this.order.append('price', this.form.price);
            this.order.append('status', this.order_status);
            var uri = this.$apiUrl + '/order'
            this.load = true 
            this.$http.post(uri, this.order).then(response => {
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
            this.order = new FormData         
            this.order.append('address', this.form.address);
            this.order.append('price_cat', this.form.price_cat);
            this.order.append('weight', this.form.weight);
            this.order.append('price', this.form.price); 
            this.order.append('status', this.order_status)            
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
            this.form.address = item.address;           
            this.form.price_cat = item.price_cat;           
            this.form.weight = item.weight,
            this.form.price = item.price,
            this.order_status = item.status,       
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
        setForm() {
            if (this.typeInput === 'new') {
                this.sendData()
            } else {
                //console.log("update data")
                this.updateData()
            }
        }, 
        resetForm() {
            this.form = {
                address: '',
                price_cat: '',
                weight: '',
                price: ''
            }
            this.order_status = ''
        },
        openDeleteDialog(deleteId){
            this.deleteDialog = true
            this.deleteId = deleteId
        },
        closeFormDialog(){
            this.dialog = false,
            this.resetForm()
            this.typeInput = 'new'
        },
        printInvoice(id) {
            var uri =
            this.$apiUrl +
            'order/printInvoice/' + id;
            // this.$http.get(uri).then(() => {
            //     this.snackbar = true;
            //     this.color = 'green';
            //     this.text = 'Berhasil';
            //     this.load = false;
            //   })
            //   .catch((error) => {
            //     this.errors = error;
            //     this.snackbar = true;
            //     this.text = 'Coba Lagi';
            //     this.color = 'red';
            //     this.load = false;
            //   });
            window.open(uri, '_blank');
            console.log(id);
        },
        
    }, 
    mounted() {
        this.myusername = window.atob(localStorage.getItem("user_username"));
        this.myphone = window.atob(localStorage.getItem("user_phone"));
        this.getPricelistData();
        this.getData();
        
        // var getPayloadUri = this.$apiUrl + '/auth'
        //     this.$http.get(getPayloadUri, {header: {'Authorization': localStorage.getItem("user_token")}})
        //     .then(response => {
        //         console.log(response)
        //     })
    },
} 
</script>