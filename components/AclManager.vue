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
                        :items="strippedSections"
                        item-text="label"
                        item-value="id"
                        :label="getTranslation('permissions_sections.general.sections.label')"
                        v-model="selectedSection"
                ></v-select>
            </v-flex>
            <v-flex xs12>
                <dynamic-matrix
                        v-if="dynamicMatrixReady"
                        :rows="rows"
                        :columns="columns"
                        :locale="locale"
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

    import {stripForSelect} from '../helpers/i18n'

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
                this.strippedSections = stripForSelect(this.sections, this.locale)
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
                strippedSections: [],
                type: null
            }
        },
        methods: {
            buildRows(data : Array<{ name: string, surname?: string, label?: any, id: number }>) : void{
                this.rows = [];
                _.each(data, (el) => {
                    let name = el.label && el.label[this.locale] ? el.label[this.locale] : (el.surname ? `${el.surname} ${el.name}` : el.name);
                    this.rows.push({ key: String(el.id), name: `${name}-(${el.id})`});
                })
            },
            buildColumns(data : Array<{ name: string, label?: any, id: number }>) : void{
                this.columns = [];
                _.each(data, (el) => {
                    this.columns.push({ key: String(el.id), name: `${el.label && el.label[this.locale] ? el.label[this.locale] : el.name}`});
                })
            },
            getData() : void{
                let url = null;
                if(this.type === 'users'){
                    url = this.usersDownloadUrl;
                }else{
                    url = this.rolesDownloadUrl;
                }
                this.tryToactivateWaiter(true);
                this.getRowsData(url).then(() => {
                    return this.axiosChoosen.get(this.permissionsDownloadUrl, {params: {locale: this.locale}}).then((response) => {
                        this.buildColumns(response.data);
                    })
                }).then(() => {
                    this.tryToactivateWaiter(false);
                    this.$nextTick(() => {
                        this.dynamicMatrixReady = true;
                    })
                })
            },
            getRowsData(url : string) : Promise<void>{
                return this.axiosChoosen.get(url, {params: {locale: this.locale}}).then((response) => {
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