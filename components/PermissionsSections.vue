<template>
    <div>
        <datatable
                ref="datatable"
                :headers="headers"
                :transport="transport"
                add
        >
            <template slot="columns" slot-scope="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="">
                    <v-edit-dialog
                            @open="props.item._name = props.item.name"
                            @cancel="props.item.name = props.item._name || props.item.name"
                            lazy
                    >
                        {{ props.item.name }}
                        <v-text-field
                                slot="input"
                                :label="getTranslation(`${componentName}.table.inputs.name.label`)"
                                single-line
                                :value="props.item.name"
                                v-validate="'required'"
                                :name="'table-name-' + props.item.id"
                                @change="props.edit(props.item,'name', $event, 'table-name-' + props.item.id)"
                        ></v-text-field>
                    </v-edit-dialog>
                </td>
                <td class="">
                    <v-select
                            :items="componentStateItems"
                            v-model="props.item.state"
                            :label="getTranslation(`${componentName}.table.inputs.state.label`)"
                            v-validate="'required'"
                            :name="'table-state-' + props.item.id"
                            @change="props.edit(props.item,'state', $event, 'table-state-' + props.item.id)"
                            single-line
                            bottom
                    ></v-select>
                </td>
                <td class="">
                    <v-btn
                            v-if="props.delete"
                            @click="props.delete(props.item, $event)"
                            icon
                            color="error"
                            dark>
                        <v-icon dark>delete</v-icon>
                    </v-btn>
                </td>
            </template>
            <div slot="create_title">{{ getTranslation(`${componentName}.table.create.title`) }}</div>
            <template slot="create_content" slot-scope="props">
                <div>
                    <v-text-field
                            :label="getTranslation(`${componentName}.table.create.inputs.name.label`)"
                            v-validate="'required'"
                            name="create-name"
                            v-model="transport.create.data.models.name"
                            autocomplete="off"
                    ></v-text-field>
                    <v-select
                            :items="componentStateItems"
                            v-model="transport.create.data.models.state"
                            :label="getTranslation(`${componentName}.table.create.inputs.state.label`)"
                            v-validate="'required'"
                            name="create-state"
                            single-line
                            bottom
                    ></v-select>
                </div>
            </template>
        </datatable>
    </div>
</template>

<script lang="ts">
    import Vue, { ComponentOptions } from 'vue';
    import Datatable from 'ts-vuetify-dom-datatable';
    import GeneralComponent, {GeneralComponentInterface} from './mixins/General.vue';

    import axios from 'axios'

    import {StateSelectItem} from '../interfaces/general'

    import * as PERMISSION_CONSTANTS from '../constants/permissions'
    import * as SECTION_CONSTANTS from '../constants/sections'

    interface PermissionsSectionsComponent extends GeneralComponentInterface{
        componentName: string;
        componentStateItems: Array<StateSelectItem>;
    }

    export default {
        mixins: [GeneralComponent],
        components: {
            'datatable': Datatable
        },
        props: {
            componentName: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                headers: [
                    {
                        align: 'center',
                        class: 'text-xs-center',
                        text: this.getTranslation(`${this.componentName}.table.headers.id.text`),
                        value: 'id',
                        width: '80px'
                    },
                    {
                        align: 'center',
                        text: this.getTranslation(`${this.componentName}.table.headers.name.text`),
                        value: 'name',
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: true,
                        text: this.getTranslation(`${this.componentName}.table.headers.state.text`),
                        value: 'state',
                        width: '50px'
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: false,
                        text: this.getTranslation(`${this.componentName}.table.headers.delete.text`),
                        value: 'delete',
                        width: '50px'
                    }
                ],
                componentStateItems: [
                    {
                        text: this.getTranslation(`${this.componentName}.state.enabled.text`),
                        value: this.componentName == 'permissions' ? PERMISSION_CONSTANTS.STATE_ENABLED : SECTION_CONSTANTS.STATE_ENABLED
                    },
                    {
                        text: this.getTranslation(`${this.componentName}.state.disabled.text`),
                        value: this.componentName == 'permissions' ? PERMISSION_CONSTANTS.STATE_DISABLED : SECTION_CONSTANTS.STATE_DISABLED
                    },
                ],
                transport: {
                    axios: this.table.axios ? this.table.axios : ( this.axios ? this.axios : axios),
                    create: {
                        url: this.urlPrefix,
                        data: {
                            models: {
                                name: null,
                                state: null
                            },
                            defaults: {
                                name: null,
                                state: this.componentName == 'permissions' ? PERMISSION_CONSTANTS.STATE_DISABLED : SECTION_CONSTANTS.STATE_DISABLED
                            }
                        }
                    },
                    delete:{
                        url: (obj : any) : string => {
                            return this.urlPrefix + '/' + obj.id
                        }
                    },
                    multi_delete: {
                        url: this.urlPrefix + '/multi_delete'
                    },
                    read: {
                        url: this.urlPrefix + "/data"
                    },
                    update: {
                        url: (obj: any) : string => {
                            return this.urlPrefix + '/' + obj.id
                        }
                    }
                }
            }
        }
    } as ComponentOptions<PermissionsSectionsComponent>;
</script>