<template>
    <div>
        <template v-if="ready && (section === 'sections' || section === 'manager') && sectionTypes && sectionTypes.length">
            <v-select
                    :items="sectionTypesStripped"
                    v-model="sectionTypeSelected"
                    :label="getTranslation('permissions_sections.general.section_types.label')"
                    item-text="label"
                    item-value="id"
            > </v-select>
        </template>
        <users
                v-if="ready && section === 'users'"
                :locale="locale"
                :open-detail-function="userComponent.openDetailFunction"
                :table="userComponent.table"
                :axios="axios"
                :url-prefix="userComponent.urlPrefix || `${urlPrefix}/users`"
                :user="userComponent.user"
                :roles-download-url="userComponent.rolesDownloadUrl ? userComponent.rolesDownloadUrl : ( rolesComponent.urlPrefix ? `${rolesComponent.urlPrefix}/all` : `${urlPrefix}/roles/all`)"
                :event-bus-configuration="eventBusConfiguration"
        ></users>
        <roles
                v-else-if="ready && section === 'roles'"
                :locale="locale"
                :table="rolesComponent.table"
                :axios="axios"
                :url-prefix="rolesComponent.urlPrefix || `${this.urlPrefix}/roles`"
                :user-download-url="rolesComponent.usersDownloadUrl ? rolesComponent.usersDownloadUrl : ( userComponent.urlPrefix ? `${userComponent.urlPrefix}/all` : `${urlPrefix}/users/all`)"
                :event-bus-configuration="eventBusConfiguration"
                :show-user-management="rolesComponent.showUserManagement"
        ></roles>
        <permissions-sections
                v-else-if="ready && section === 'permissions'"
                :component-name="section"
                :locale="locale"
                :axios="axios"
                :url-prefix="`${this.urlPrefix}/permissions`"
                :event-bus-configuration="eventBusConfiguration"
        ></permissions-sections>
        <permissions-sections
                v-else-if="ready && section === 'sections'"
                :component-name="section"
                :locale="locale"
                :axios="axios"
                :url-prefix="`${this.urlPrefix}/sections${sectionDownloadUrlType}`"
                :event-bus-configuration="eventBusConfiguration"
        ></permissions-sections>
        <permissions-sections
                v-else-if="ready && section === 'section_types'"
                :component-name="section"
                :locale="locale"
                :axios="axios"
                :url-prefix="sectionTypesDownloadUrl"
                :event-bus-configuration="eventBusConfiguration"
        ></permissions-sections>
        <acl-manager v-else-if="ready && section === 'manager'"
                :data-transfer-url="aclManagerConfiguration.dataTransferUrl ? aclManagerConfiguration.dataTransferUrl : ( aclManagerConfiguration.urlPrefix ? `${aclManagerConfiguration.urlPrefix}/matrix-hook` : `${this.urlPrefix}/matrix-hook`)"
                :permissions-download-url="aclManagerConfiguration.permissionsDownloadUrl ? aclManagerConfiguration.permissionsDownloadUrl : ( aclManagerConfiguration.urlPrefix ? `${aclManagerConfiguration.urlPrefix}/permissions/all` : `${this.urlPrefix}/permissions/all`)"
                :roles-download-url="aclManagerConfiguration.rolesDownloadUrl ? aclManagerConfiguration.rolesDownloadUrl : ( aclManagerConfiguration.urlPrefix ? `${aclManagerConfiguration.urlPrefix}/roles/all` : `${this.urlPrefix}/roles/all`)"
                :sections-download-url="aclManagerConfiguration.sectionsDownloadUrl ? `${aclManagerConfiguration.sectionsDownloadUrl}${sectionDownloadUrlType}` : ( aclManagerConfiguration.urlPrefix ? `${aclManagerConfiguration.urlPrefix}/sections/all${sectionDownloadUrlType}` : `${this.urlPrefix}/sections/all${sectionDownloadUrlType}`)"
                :users-download-url="aclManagerConfiguration.usersDownloadUrl ? aclManagerConfiguration.usersDownloadUrl : ( aclManagerConfiguration.urlPrefix ? `${aclManagerConfiguration.urlPrefix}/users/all` : `${this.urlPrefix}/users/all`)"
        ></acl-manager>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import axios from 'axios';

    import Users, {UserDefinition, UserField} from './components/Users.vue'

    import EventBusManager from './components/mixins/EventBusManager.vue';
    import Translator from './components/mixins/Translator.vue';

    import {stripForSelect} from './helpers/i18n'

    import {AxiosStatic} from 'axios';

    import Roles, {} from './components/Roles.vue'

    import PermissionsSections, {} from './components/PermissionsSections.vue'

    import AclManager, {} from './components/AclManager.vue'

    import {Role} from './interfaces/role'

    import {TableDefinition} from './interfaces/general'

    import {EventBusConfiguration} from './interfaces/configurations'

    interface UserComponentConfiguration {
        openDetailFunction(item : any, $event? : any);
        rolesDownloadUrl?: string;
        table?: TableDefinition;
        urlPrefix?: string;
        user: UserDefinition;
    }

    interface RoleComponentConfiguration {
        usersDownloadUrl?: string;
        showUserManagement?: boolean
        table?: TableDefinition;
        urlPrefix?: string;
    }

    interface AclManagerComponentConfiguration {
        permissionsDownloadUrl?: string;
        rolesDownloadUrl?: string;
        sectionsDownloadUrl?: string;
        usersDownloadUrl?: string;
        dataTransferUrl?: string;
        urlPrefix?: string;
    }

    export {
        AclManagerComponentConfiguration,
        EventBusConfiguration,
        Role,
        RoleComponentConfiguration,
        UserComponentConfiguration,
        UserDefinition,
        UserField,
        TableDefinition
    }

    export default Vue.extend({
        mixins: [EventBusManager, Translator],
        components: {
            'permissions-sections': PermissionsSections,
            'roles': Roles,
            'users': Users,
            'acl-manager': AclManager
        },
        created(){
            if(this.section === 'sections' || this.section === 'manager'){
                this.tryToactivateWaiter(true);
                let url = `${this.sectionTypesDownloadUrl}/checkAndDownload`;
                this.axiosChoosen.get(url).then((response) => {
                    if(response.data.response){
                        this.sectionTypes = response.data.data;
                        this.sectionTypesStripped = stripForSelect(this.sectionTypes, this.locale);
                    }
                    this.ready = true;
                }).catch((err) => {
                    console.trace();
                    console.log(err)
                }).then(() => {
                    this.tryToactivateWaiter(false);
                });
            }else{
                this.ready = true;
            }

        },
        props: {
            aclManagerConfiguration: {
                type: Object,
                default(){
                    return {};
                }
            },
            axios:{
                type: Object
            },
            eventBusConfiguration: {
                type: Object,
                default(){
                    return {};
                }
            },
            locale: {
                type: String,
                default: 'it'
            },
            rolesComponent: {
                type: Object,
                default(){
                    return {}
                }
            },
            section: {
                type: String,
                required: true
            },
            urlPrefix: {
                type: String
            },
            userComponent: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                ready: false,
                sectionTypes: null,
                sectionTypeSelected: null,
                sectionTypesStripped: [],
                axiosChoosen: this.axios || axios,
                sectionTypesDownloadUrl: `${this.urlPrefix}/section_types`,
                sectionDownloadUrlType: ''
            }
        },
        watch: {
            sectionTypeSelected(val){
                this.sectionDownloadUrlType = `/${val}`;
                this.ready = false;
                this.$nextTick(() => {
                    this.ready = true;
                })
            }
        }
    });
</script>

