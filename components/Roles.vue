<template>
    <div>
        <datatable
                ref="datatable"
                :headers="headers"
                :locale="locale"
                :transport="transport"
                @update="updateComplete($event)"
                v-on:update-error="updateComplete($event, true)"
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
                                :label="getTranslation('roles.table.inputs.name.label')"
                                single-line
                                :value="props.item.name"
                                v-validate="'required'"
                                :name="'table-name-' + props.item.id"
                                @change="props.edit(props.item,'name', $event, 'table-name-' + props.item.id)"
                        ></v-text-field>
                    </v-edit-dialog>
                </td>
                <td v-if="showName" class="">
                    <v-text-field
                            :label="getTranslation('roles.table.inputs.label.label')"
                            single-line
                            :value="props.item.label && props.item.label[locale] ? props.item.label[locale] : props.item"
                            v-validate="'required'"
                            :name="'table-label-' + props.item.id"
                            @input="changeLabel($event, locale, props.item)"
                    ></v-text-field>
                </td>
                <td class="">
                    <v-select
                            :items="rolesStateItems"
                            v-model="props.item.state"
                            :label="getTranslation('roles.table.inputs.state.label')"
                            v-validate="'required'"
                            :name="'table-state-' + props.item.id"
                            @change="props.edit(props.item,'state', $event, 'table-state-' + props.item.id)"
                            single-line
                            bottom
                    ></v-select>
                </td>
                <td v-if="showUserManagement" class="">
                    <v-btn @click="openUsers(props.item, $event)" :loading="userButtonLoading" icon color="primary" dark>
                        <v-icon dark>open_in_new</v-icon>
                    </v-btn>
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
            <div slot="create_title">{{ getTranslation('roles.table.create.title') }}</div>
            <template slot="create_content" slot-scope="props">
                <div>
                    <v-text-field
                            :label="getTranslation('roles.table.create.inputs.name.label')"
                            v-validate="'required'"
                            name="create-name"
                            v-model="transport.create.data.models.name"
                            autocomplete="off"
                    ></v-text-field>
                    <v-select
                            :items="rolesStateItems"
                            v-model="transport.create.data.models.state"
                            :label="getTranslation('roles.table.create.inputs.state.label')"
                            v-validate="'required'"
                            name="create-state"
                            single-line
                            bottom
                    ></v-select>
                    <v-select
                            v-if="showUserManagement"
                            :label="getTranslation('roles.table.create.inputs.users.label')"
                            :items="users"
                            v-model="transport.create.data.models.users"
                            multiple
                            chips
                            item-text="name"
                            item-value="id"
                    ></v-select>
                </div>
            </template>
        </datatable>
        <v-dialog v-model="usersDialog" :persistent="usersDialogLoading" max-width="500px">
            <v-card>
                <v-card-title class="headline">{{ getTranslation('roles.table.modify.users.title') }}</v-card-title>
                <v-card-text>
                    <v-select
                            :label="getTranslation('roles.table.modify.inputs.users.label')"
                            :items="users"
                            v-model="usersCache"
                            multiple
                            chips
                            item-text="name"
                            item-value="id"
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <template v-if="!usersDialogLoading">
                        <v-btn color="primary" flat="flat" @click.native="usersDialog = false">{{ getTranslation('roles.table.modify.users.buttons.dismiss') }}</v-btn>
                        <v-btn color="primary" flat="flat" @click.native="confirmUsersDialog">{{ getTranslation('roles.table.modify.users.buttons.confirm') }}</v-btn>
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
    import Datatable from 'ts-vuetify-dom-datatable';
    import GeneralComponent, {GeneralComponentInterface} from './mixins/General.vue';

    import axios from 'axios'

    import _ from 'lodash'

    import {StateSelectItem} from '../interfaces/general'
    import {User} from '../interfaces/user'

    import * as ROLES_CONSTANTS from '../constants/roles'

    interface RolesComponent extends GeneralComponentInterface{
        rolesStateItems: Array<StateSelectItem>;
        showUserManagement: boolean;
        userDownloadUrl: string;
        users: Array<User>;
        userButtonLoading: boolean;
        usersCache: Array<number>;
        usersDialog: boolean;
        usersDialogLoading: boolean;
        usersItemCache: any;
    }

    export default {
        mixins: [GeneralComponent],
        components: {
            'datatable': Datatable
        },
        created(){
            if(this.showUserManagement){
                this.tryToactivateWaiter(true);
                this.transport.axios.get(this.userDownloadUrl).then((response) => {
                    this.users = <User[]>response.data;
                }).catch((err) => {
                    console.trace();
                    console.log(err);
                }).then(() => {
                    this.tryToactivateWaiter(false);
                });

                this.headers.splice(3, 0, {
                    align: 'center',
                    searchable: false,
                    sortable: false,
                    text: this.getTranslation('roles.table.headers.users.text'),
                    value: 'users',
                    width: '50px'
                });
            }
        },
        props: {
            showUserManagement:{
                type: Boolean
            },
            userDownloadUrl: {
                type: String,
                required: true
            },
            showName: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                headers: [
                    {
                        align: 'center',
                        class: 'text-xs-center',
                        text: this.getTranslation('roles.table.headers.id.text'),
                        value: 'id',
                        width: '80px'
                    },
                    {
                        align: 'center',
                        text: this.getTranslation('roles.table.headers.name.text'),
                        value: 'name',
                        hidden: !this.showName
                    },
                    {
                        align: 'center',
                        text: this.getTranslation('roles.table.headers.label.text'),
                        value: 'label',
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: true,
                        text: this.getTranslation('roles.table.headers.state.text'),
                        value: 'state',
                        width: '50px'
                    },
                    {
                        align: 'center',
                        searchable: false,
                        sortable: false,
                        text: this.getTranslation('roles.table.headers.delete.text'),
                        value: 'delete',
                        width: '50px'
                    }
                ],
                rolesStateItems: [
                    {
                        text: this.getTranslation('roles.state.enabled.text'),
                        value: ROLES_CONSTANTS.STATE_ENABLED
                    },
                    {
                        text: this.getTranslation('roles.state.disabled.text'),
                        value: ROLES_CONSTANTS.STATE_DISABLED
                    },
                ],
                transport: {
                    axios: this.table.axios ? this.table.axios : ( this.axios ? this.axios : axios),
                    create: {
                        url: this.urlPrefix,
                        data: {
                            models: {
                                name: null,
                                state: null,
                                users: null
                            },
                            defaults: {
                                name: null,
                                state: ROLES_CONSTANTS.STATE_DISABLED,
                                users: []
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
                users: [],
                usersCache: [],
                usersDialog: false,
                usersDialogLoading: false,
                usersItemCache: null
            }
        },
        methods: {
            confirmUsersDialog(){
                this.usersDialogLoading = true;
                (this.$refs['datatable'] as any).dt_updateField(this.usersItemCache, 'users', this.usersCache);
            },
            openUsers(item, $event){
                this.usersCache = _.map(item.users, 'id');
                this.usersItemCache = item;
                this.usersDialog = true;
            },
            updateComplete($event, error){
                //TODO discriminate in base of type of request ($event) is a response of axios
                this.usersDialogLoading = false;
                if(!error){
                    this.usersDialog = false;
                    (this.$refs['datatable'] as any).loadDataTablesData();
                }
            },
        }
    } as ComponentOptions<RolesComponent>;
</script>