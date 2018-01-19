<script lang="ts">
    import Vue, { ComponentOptions } from 'vue';
    import messages from '../../i18n/messages';
    import _ from 'lodash';
    import {TableDefinition} from '../../interfaces/general'
    import {Header, Transport} from 'ts-vuetify-dom-datatable'
    import {AxiosStatic} from 'axios';
    import {EventBusConfiguration} from '../../interfaces/configurations'
    import axios from 'axios'

    interface GeneralComponent extends Vue{
        axios: AxiosStatic;
        headers: Array<Header>;
        eventBusConfiguration: EventBusConfiguration;
        lang();
        locale: string;
        getTranslation(key : string, parameter? : object);
        transport: Transport;
        table: TableDefinition;
        tryToactivateWaiter(enable : boolean);
        urlPrefix: string;
    }

    export {
        GeneralComponent as GeneralComponentInterface
    }

    export default {
        props:{
            axios: {
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
            table: {
                type:Object,
                default(){
                    return {
                        axios: null,
                        inputs: {
                            name: {
                                validation: 'required'
                            }
                        }
                    }
                }
            },
            urlPrefix: {
                type: String,
                default: '/'
            }
        },
        methods: {
            tryToactivateWaiter(enable : boolean){
                if(
                    this.eventBusConfiguration.eventBus &&
                    this.eventBusConfiguration.eventsName &&
                    this.eventBusConfiguration.eventsName.waiterEnabling &&
                    this.eventBusConfiguration.eventsName.waiterDisabling
                ){
                    if(enable){
                        this.eventBusConfiguration.eventBus.$emit(this.eventBusConfiguration.eventsName.waiterEnabling);
                    }else{
                        this.eventBusConfiguration.eventBus.$emit(this.eventBusConfiguration.eventsName.waiterDisabling);
                    }
                }

            },
            lang(){
                let m = messages[this.locale];
                if(!m){
                    return messages['it'];
                }
                return m;
            },
            getTranslation(key : string, parameters : object = undefined){
                let m = this.lang();
                return _.get(m, key, key);
            },
            changeLabel(value, locale, item){
                let a = this.axios || axios;
                a.put(this.urlPrefix + '/' + item.id, {
                    field: 'label',
                    label: value,
                    locale: locale
                })
            },
        }
    } as ComponentOptions<GeneralComponent>;
</script>