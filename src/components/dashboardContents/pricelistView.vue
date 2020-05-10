<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">PRICELIST</h2>
                <v-layout row wrap style="margin:10px">
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
                            </tr>
                        </tbody>
                    </template> </v-data-table>
            </v-container>
        </v-card>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            keyword: '',
            headers: [
                {
                    text: 'No',
                    value: 'no',
                    sortable: false
                }, 
                {
                    text: 'Category',
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
            ],
            pricelist: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            errors: '',
        }
    },
    methods: {
        getData() {
            var uri = this.$apiUrl + '/pricelist'
            this.$http.get(uri).then(response => {
                this.pricelist = response.data.message
            })
        },
    }, 
    mounted() {
        this.getData();
    },
} 
</script>