<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center mt-5">CUSTOMER'S REVIEW</h2>
                <v-layout row wrap style="margin:10px" class="mt-10">
                    <v-flex xs6 class="text-right">
                        <v-select class="align-center" :items="review_category" v-model="filter" label="Filter by Category" outlined clearable="true"></v-select>
                    </v-flex>
                </v-layout>
                <template>
                    <v-layout row wrap align-center :search="keyword">
                            <v-flex>
                                <div v-for="item in filteredItems" :key="item.id" class="mb-3">
                                    <v-card class="mx-auto" max-width="750" outlined>
                                        <v-list-item three-line>
                                            <v-layout>
                                                <v-flex>
                                                    <v-list-item-content>
                                                        <v-list-item-title style="font-size:22px">{{ item.username }}</v-list-item-title>
                                                        <v-list-item-subtitle class="font-weight-light">{{ item.created_at }}</v-list-item-subtitle>
                                                        <v-rating v-model="item.rate" readonly color="yellow" background-color="yellow lighten-3"></v-rating>
                                                        <v-list-item-subtitle class="font-weight-medium" style="font-size:15px">{{ item.description }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-flex>
                                                <v-flex>
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle class="font-weight-light align-end">Category</v-list-item-subtitle>
                                                        <v-list-item-subtitle style="font-size:18px" class="font-weight-regular align-end">{{ item.category }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-flex>
                                                <v-flex xs1 class="pt-3 pl-4">
                                                    <v-btn class="align-end" icon color="warning" light @click="openDeleteDialog(item.id)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-item>
                                    </v-card>
                                </div>
                            </v-flex>
                        </v-layout>
                </template>
            </v-container>
        </v-card>
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
            review_category: [
                'Service',
                'Duration',
                'Cleanliness',
                'Perfume Aroma',
                'Packaging'
            ],
            reviews: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            review: new FormData,
            errors: '',
            updatedId: '',
            filter: ''
        }
    },
    computed:{
        filteredItems() {
            return this.reviews.filter((i) => {
                return !this.filter || (i.category === this.filter);
            })
        }
    },
    methods: {
        getData() {
            var uri = this.$apiUrl + '/review'
            this.$http.get(uri).then(response => {
                this.reviews = response.data.message
            })
        },      
        deleteData(deleteId){ //mengahapus data             
            var uri = this.$apiUrl + '/review/' + deleteId; //data dihapus berdasarkan id 
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