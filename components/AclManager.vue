<template>
    <div>
        <div v-if="ready" style="display: flex; flex-direction: row; flex-wrap: wrap;">
            <v-flex xs12 md6>
                <v-radio-group v-model="type" row>
                    <v-radio :label="getTranslation('manager.toolbar.selectors.type.users.label')" value="users" ></v-radio>
                    <v-radio :label="getTranslation('manager.toolbar.selectors.type.roles.label')" value="roles"></v-radio>
                </v-radio-group>
            </v-flex>
            <v-flex xs12 md6>
                <v-select
                        :items="sections"
                        item-text="name"
                        item-value="id"
                        v-model="selectedSection"
                ></v-select>
            </v-flex>
            <v-flex xs12>
                <dynamic-matrix
                        v-if="dynamicMatrixReady"
                        :rows="rows"
                        :columns="columns"
                        :url-prefix="dataTransferUrlWithSection"
                ></dynamic-matrix>
            </v-flex>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, { ComponentOptions } from 'vue';

    import GeneralComponent from './mixins/General.vue'

    import DynamicMatrix, {Column, Row} from 'ts-vuetify-dom-dynamic-matrix'

    import axios, {AxiosStatic} from 'axios';

    import _ from 'lodash';

    import {Section} from '../interfaces/section'

    export default Vue.extend({
        mixins: [GeneralComponent],
        components: {
            'dynamic-matrix': DynamicMatrix
        },
        created(){
            this.tryToactivateWaiter(true);
            let url = this.sectionsDownloadUrl;
            this.axiosChoosen.get(url).then((response) => {
                this.sections = <Section[]> response.data;
                this.ready = true;
            }).catch((err) => {
                console.trace();
                console.log(err)
            }).then(() => {
                this.tryToactivateWaiter(false);
            });
        },
        data(){
            return {
                axiosChoosen: (this as any).axios || axios,
                columns: [],
                dataTransferUrlWithSection: null,
                dynamicMatrixReady: false,
                ready: false,
                rows: [],
                sections: [],
                selectedSection: null,
                type: null
            }
        },
        methods: {
            buildRows(data : Array<{ name: string, id: number }>) : void{
                this.rows = [];
                _.each(data, (el) => {
                    this.rows.push({ key: String(el.id), name: `${el.name}-(${el.id})`});
                })
            },
            buildColumns(data : Array<{ name: string, id: number }>) : void{
                this.columns = [];
                _.each(data, (el) => {
                    this.columns.push({ key: String(el.id), name: `${el.name}`});
                })
            },
            getData() : void{
                let url = null;
                if(this.type === 'users'){
                    url = this.usersDownloadUrl;
                }else{
                    url = this.rolesDownloadUrl;
                }
                this.getRowsData(url).then(() => {
                    return this.axiosChoosen.get(this.permissionsDownloadUrl).then((response) => {
                        this.buildColumns(response.data);
                    })
                }).then(() => {
                    this.$nextTick(() => {
                        this.dynamicMatrixReady = true;
                    })
                })
            },
            getRowsData(url : string) : Promise<void>{
                return this.axiosChoosen.get(url).then((response) => {
                    this.buildRows(response.data);
                })
            }
        },
        props: {
            dataTransferUrl: {
                type: String,
                required: true
            },
            permissionsDownloadUrl: {
                type: String,
                required: true
            },
            rolesDownloadUrl: {
                type: String,
                required: true
            },
            sectionsDownloadUrl: {
                type: String,
                required: true
            },
            usersDownloadUrl: {
                type: String,
                required: true
            }
        },
        watch: {
            type(val){
                this.dynamicMatrixReady = false;
                if(!this.selectedSection){
                    return;
                }
                this.dataTransferUrlWithSection = `${this.dataTransferUrl}/${this.selectedSection}/${this.type}`;
                this.getData();
            },
            selectedSection(val){
                this.dynamicMatrixReady = false;
                if(!this.type){
                    return;
                }
                this.dataTransferUrlWithSection = `${this.dataTransferUrl}/${this.selectedSection}/${this.type}`;
                this.getData();
            }
        }
    });
</script>