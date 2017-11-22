<template>
    <div>
        <datatable
                ref="datatable"
                :headers="headers"
                :transport="transport"
                :locale="locale"
                v-on:created-error="manageCreatedError($event)"
                @update="updateComplete($event)"
                v-on:update-error="updateComplete($event, true)"
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
                                :label="getTranslation('users.table.inputs.name.label')"
                                single-line
                                :value="props.item.name"
                                v-validate="table.inputs && table.inputs.name ? table.inputs.name.validation : null"
                                :name="'table-name-' + props.item.id"
                                @change="props.edit(props.item,'name', $event, 'table-name-' + props.item.id)"
                        ></v-text-field>
                    </v-edit-dialog>
                </td>
                <td v-if="user.state">
                    <v-select
                            :items="userStateItems"
                            v-model="props.item.state"
                            :label="getTranslation('users.table.inputs.state.label')"
                            v-validate="'required'"
                            :name="'table-state-' + props.item.id"
                            @change="props.edit(props.item,'state', $event, 'table-state-' + props.item.id)"
                            single-line
                            bottom
                    ></v-select>
                </td>
                <td class="">
                    <v-btn
                            @click="openRoles(props.item, $event)"
                            :loading="rolesButtonLoading"
                            icon color="primary"
                            slot="activator"
                            dark
                    >
                        <v-icon dark>open_in_new</v-icon>
                    </v-btn>
                </td>
                <td v-if="openDetailFunction">
                    <v-btn @click="openDetailFunction(props.item, $event)" icon color="primary" dark>
                        <v-icon dark>person</v-icon>
                    </v-btn>
                </td>
                <td class="">
                    <v-btn @click="props.delete(props.item, $event)" icon color="error" dark>
                        <v-icon dark>delete</v-icon>
                    </v-btn>
                </td>
            </template>
            <div slot="create_title">{{ getTranslation('users.table.create.title') }}</div>
            <template slot="create_content" slot-scope="props">
                <div>
                    <field
                            v-for="f in user.fields"
                            ref="create-fields"
                            :field="f"
                            :value="updatedValue(f.name)"
                            @input="updateField(f.name, $event)"
                            :key="f.name"
                            :name="f.name"
                    ></field>
                </div>
            </template>
        </datatable>
        <v-dialog v-model="rolesDialog" :persistent="rolesDialogLoading" max-width="500px">
            <v-card>
                <v-card-title class="headline">{{ getTranslation('users.table.modify.roles.title') }}</v-card-title>
                <v-card-text>
                    <v-checkbox
                            v-for="r in this.roles"
                            :value="r.id"
                            :label="r.name"
                            v-model="rolesCache"
                            :key="r.id"
                    ></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <template v-if="!rolesDialogLoading">
                        <v-btn color="primary" flat="flat" @click.native="rolesDialog = false">{{ getTranslation('users.table.modify.roles.buttons.dismiss') }}</v-btn>
                        <v-btn color="primary" flat="flat" @click.native="confirmRolesDialog">{{ getTranslation('users.table.modify.roles.buttons.confirm') }}</v-btn>
                    </template>
                    <div v-else style="display: flex; flex-direction: row;justify-content: center;width: 100%;">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import Vue, { ComponentOptions } from 'vue';

    import Datatable, {Header, Transport} from 'ts-vuetify-dom-datatable'

    import axios from 'axios'

    import _ from 'lodash'

    import {COMPONENTS_HELPER, GENERAL_HELPER} from 'ts-vue-dom-helper'

    import GeneralComponent, {GeneralComponentInterface}  from './mixins/General.vue'

    import VuetifyField, {Field, Value} from 'ts-vuetify-dom-field'

    import {Role} from '../interfaces/role'
    import {StateSelectItem, TableDefinition} from '../interfaces/general'

    interface UserField extends Field{
        defaultValue?: any
    }

    interface UserDefinition {
        fields: Array<UserField>
        state?: {
            enabled: any;
            disabled: any;
        }
    }

    interface UsersComponent extends GeneralComponentInterface{
        $validator: any;
        confirmRolesDialog();
        openDetailFunction(item : any, $event? : any);
        roles: Role[];
        rolesButtonLoading: boolean;
        rolesCache: number[];
        rolesDialog: boolean;
        rolesDialogLoading: boolean;
        rolesItemCache: any;
        userStateItems: Array<StateSelectItem>;
        user: UserDefinition;
    }

    export {
        UserDefinition,
        UserField
    }

    export default {
        created(){
            this.rolesButtonLoading = true;
            this.transport.axios.get(this.rolesDownloadUrl).then((response) => {
                this.roles = <Role[]>response.data;
                this.rolesButtonLoading = false;
            }).catch((err) => {
                console.trace();
                console.log(err);
            })

            _.each(this.user.fields, (el : UserField) => {
                this.transport.create.data.models[el.name] = null;
                this.transport.create.data.defaults[el.name] = el.defaultValue !== undefined ? el.defaultValue : null;
            })

            this.$validator._validateAll = this.$validator.validateAll;
            this.$validator.validateAll = () => {
                return new Promise<boolean>((resolve, reject) => {
                    let promises = new Array<Promise<boolean>>();
                    promises.push(this.$validator._validateAll())
                    _.each(this.$refs['create-fields'], (el) => {
                        promises.push(el.$validator.validateAll());
                    })

                    Promise.all(promises).then((results) => {
                        for(let index in results){
                            if(!results[index]){
                                resolve(false);
                                return;
                            }
                        }

                        resolve(true);
                    }).catch((err) => {
                        console.trace();
                        console.log();
                        reject(err);
                    });
                });
            }

            if(this.user.state){
                this.headers.splice(2, 0, {
                    align: 'center',
                    searchable: false,
                    sortable: true,
                    text: this.getTranslation('users.table.headers.state.text'),
                    value: 'state',
                    width: '50px'
                });

                this.userStateItems[0].value = this.user.state.enabled;
                this.userStateItems[1].value = this.user.state.disabled;
            }

            if(this.openDetailFunction){
                let index = this.user.state ? 4 : 3;
                this.headers.splice(index, 0, {
                    align: 'center',
                    searchable: false,
                    sortable: false,
                    text: this.getTranslation('users.table.headers.detail.text'),
                    value: 'detail',
                    width: '50px'
                });
            }
        },
        mixins: [GeneralComponent],
        components: {
            'datatable': Datatable,
            'field': VuetifyField
        },
        props: {
            openDetailFunction: {
                default: null
            },
            rolesDownloadUrl: {
                type: String,
                required: true
            },
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                headers: [
                    {
                        align: 'center',
                        class: 'text-xs-center',
                        text: this.getTranslation('users.table.headers.id.text'),
                        value: 'id',
                        width: '80px'
                    },
                    {
                        align: 'center',
                        text: this.getTranslation('users.table.headers.name.text'),
                        value: 'name',
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: false,
                        text: this.getTranslation('users.table.headers.roles.text'),
                        value: 'roles',
                        width: '50px'
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: false,
                        text: this.getTranslation('users.table.headers.delete.text'),
                        value: 'delete',
                        width: '50px'
                    }
                ],
                roles: [],
                rolesButtonLoading: true,
                rolesCache: [],
                rolesDialog: false,
                rolesDialogLoading: false,
                rolesItemCache: null,
                userStateItems: [
                    {
                        text: this.getTranslation('users.state.enabled.text')
                    },
                    {
                        text: this.getTranslation('users.state.disabled.text')
                    },
                ],
                transport: {
                    axios: this.table.axios ? this.table.axios : ( this.axios ? this.axios : axios),
                    create: {
                        url: this.urlPrefix,
                        data: {
                            models: {},
                            defaults: {}
                        },
                        errors:{
                            codes:{
                                disabled: [422]
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
                        url: this.urlPrefix + `/data`
                    },
                    update: {
                        url: (obj: any) : string => {
                            return this.urlPrefix + '/' + obj.id
                        }
                    }
                },
            }
        },
        methods: {
            confirmRolesDialog(){
                this.rolesDialogLoading = true;
                (this.$refs['datatable'] as any).dt_updateField(this.rolesItemCache, 'roles', this.rolesCache);
            },
            manageCreatedError($event){
                if(!$event.response || !$event.response.data || !$event.response.data.errors){
                    return;
                }
                let errors = $event.response.data.errors;
                _.each(_.keys(errors), (el) => {
                    let $el = <any>COMPONENTS_HELPER.getElementFromArrayByAttribute(<Vue[]>this.$refs['create-fields'], 'name', el);
                    $el.setErrors(errors[el]);
                })
            },
            openRoles(item, $event){
                this.rolesCache = _.map(item.roles, 'id');
                this.rolesItemCache = item;
                this.rolesDialog = true;
            },
            updateComplete($event, error){
                //TODO discriminate in base of type of request ($event) is a response of axios
                this.rolesDialogLoading = false;
                if(!error){
                    this.rolesDialog = false;
                    (this.$refs['datatable'] as any).loadDataTablesData();
                }
            },
            updatedValue(fieldName){
                return this.transport.create.data.models[fieldName];
            },
            updateField(fieldName, $event){
                this.transport.create.data.models[fieldName] = $event;
                this.$nextTick(() => {
                    this.$forceUpdate();
                })
            }
        }
    } as ComponentOptions<UsersComponent>;
</script>