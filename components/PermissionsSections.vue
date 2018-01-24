<template>
    <div>
        <datatable
                ref="datatable"
                :headers="headers"
                :locale="locale"
                :transport="transport"
                add
        >
            <template slot="columns" slot-scope="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td v-if="showName" class="">
                    <v-edit-dialog
                            @open="props.item._name = props.item.name"
                            @cancel="props.item.name = props.item._name || props.item.name"
                            lazy
                    >
                        {{ props.item.name }}
                        <v-text-field
                                slot="input"
                                :label="getTranslation(`permissions_sections.table.inputs.name.label`)"
                                single-line
                                :value="props.item.name"
                                v-validate="'required'"
                                :name="'table-name-' + props.item.id"
                                @change="props.edit(props.item,'name', $event, 'table-name-' + props.item.id)"
                        ></v-text-field>
                    </v-edit-dialog>
                </td>
                <td class="">
                    <v-text-field
                            :label="getTranslation(`permissions_sections.table.inputs.label.label`)"
                            single-line
                            :value="props.item.label && props.item.label[locale] ? props.item.label[locale] : props.item.name"
                            v-validate="'required'"
                            :name="'table-label-' + props.item.id"
                            @input="changeLabel($event, locale, props.item)"
                    ></v-text-field>
                </td>
                <td class="">
                    <v-select
                            :items="componentStateItems"
                            v-model="props.item.state"
                            :label="getTranslation(`permissions_sections.table.inputs.state.label`)"
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
            <div slot="create_title">{{ getTranslation(`permissions_sections.table.create.title`) }}</div>
            <template slot="create_content" slot-scope="props">
                <div>
                    <v-text-field
                            v-if="showName"
                            :label="getTranslation(`permissions_sections.table.create.inputs.name.label`)"
                            v-validate="'required'"
                            name="create-name"
                            v-model="transport.create.data.models.name"
                            autocomplete="off"
                    ></v-text-field>
                    <v-text-field
                            :label="getTranslation(`permissions_sections.table.create.inputs.label.label`)"
                            v-validate="'required'"
                            name="create-label"
                            :value="transport.create.data.models.label"
                            @input="manageLabelInCreation($event, transport.create.data.models, locale)"
                            autocomplete="off"
                    ></v-text-field>
                    <v-select
                            v-if="checkSectionTypes()"
                            :items="sectionTypes"
                            v-model="transport.create.data.models.section_type_id"
                            :label="getTranslation('permissions_sections.general.section_types.label')"
                            item-text="label"
                            item-value="id"
                    > </v-select>
                    <v-select
                            :items="componentStateItems"
                            v-model="transport.create.data.models.state"
                            :label="getTranslation(`permissions_sections.table.create.inputs.state.label`)"
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
    import GeneralComponent from './mixins/General.vue';

    import axios from 'axios'

    import {StateSelectItem, StateDefinition} from '../interfaces/general'

    import * as PERMISSION_CONSTANTS from '../constants/permissions'
    import * as SECTION_CONSTANTS from '../constants/sections'
    import * as SECTION_TYPE_CONSTANTS from '../constants/section_types'

    export default Vue.extend({
        mixins: [GeneralComponent],
        components: {
            'datatable': Datatable
        },
        props: {
            componentName: {
                type: String,
                required: true
            },
            sectionTypes: {
                type: Array,
                default(){
                    return [];
                }
            },
            sectionTypeId: {
                default: null
            }
        },
        data(){
            return {
                headers: [
                    {
                        align: 'center',
                        class: 'text-xs-center',
                        text: (this as any).getTranslation(`permissions_sections.table.headers.id.text`),
                        value: 'id',
                        width: '80px'
                    },
                    {
                        align: 'center',
                        text: (this as any).getTranslation(`permissions_sections.table.headers.name.text`),
                        value: 'name',
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: true,
                        text: (this as any).getTranslation(`permissions_sections.table.headers.state.text`),
                        value: 'state',
                        width: '50px'
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: false,
                        text: (this as any).getTranslation(`permissions_sections.table.headers.delete.text`),
                        value: 'delete',
                        width: '50px'
                    }
                ],
                componentStateItems: [
                    {
                        text: (this as any).getTranslation(`permissions_sections.state.enabled.text`),
                        value: (this as any).getStateConstants().STATE_ENABLED
                    },
                    {
                        text: (this as any).getTranslation(`permissions_sections.state.disabled.text`),
                        value: (this as any).getStateConstants().STATE_DISABLED
                    },
                ],
                transport: {
                    axios: (this as any).table.axios ? (this as any).table.axios : ( (this as any).axios ? (this as any).axios : axios),
                    create: {
                        url: (this as any).urlPrefix,
                        data: {
                            models: {
                                label: null,
                                locale: null,
                                name: null,
                                section_type_id: (this as any).checkSectionTypes() ? null : undefined,
                                state: null
                            },
                            defaults: {
                                label: null,
                                locale: (this as any).locale,
                                name: null,
                                section_type_id: (this as any).checkSectionTypes() ? null : undefined,
                                state: (this as any).getStateConstants().STATE_DISABLED
                            }
                        }
                    },
                    delete:{
                        url: (obj : any) : string => {
                            return (this as any).urlPrefix + '/' + obj.id
                        }
                    },
                    multi_delete: {
                        url: (this as any).urlPrefix + '/multi_delete'
                    },
                    read: {
                        url: (this as any).urlPrefix + "/data" + ((this as any).checkSectionTypes() && (this as any).sectionTypeId ? `/${(this as any).sectionTypeId}` : '')
                    },
                    update: {
                        url: (obj: any) : string => {
                            return (this as any).urlPrefix + '/' + obj.id
                        }
                    }
                }
            }
        },
        methods: {
            checkSectionTypes(){
                return this.componentName === 'sections' && this.sectionTypes.length > 0;
            },
            getStateConstants() : StateDefinition{
                switch (this.componentName){
                    case 'sections':
                        return SECTION_CONSTANTS;
                    case 'section_types':
                        return SECTION_TYPE_CONSTANTS;
                    case 'permissions':
                        return PERMISSION_CONSTANTS;
                    default:
                        throw `${this.componentName} is unknown`
                }
            }
        }
    });
</script>