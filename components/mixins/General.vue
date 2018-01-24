<script lang="ts">
    import Vue, { ComponentOptions } from 'vue';
    import {TableDefinition} from '../../interfaces/general'
    import {Header, Transport} from 'ts-vuetify-dom-datatable'
    import {AxiosStatic} from 'axios';
    import {EventBusConfiguration} from '../../interfaces/configurations'
    import EventBusManager from './EventBusManager.vue'
    import Translator from './Translator.vue';
    import axios from 'axios'

    import randomstring from 'randomstring'

    export default Vue.extend({
        mixins: [EventBusManager, Translator],
        props:{
            axios: {
                type: Object
            },
            showName: {
                type: Boolean,
                default: true
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
            changeLabel(value, locale, item){
                let a = this.axios || axios;
                a.put(this.urlPrefix + '/' + item.id, {
                    field: 'label',
                    label: value,
                    locale: locale
                })
            },
            manageLabelInCreation(value, models, locale){
                if(!this.showName){
                    models.name = randomstring.generate({
                        length: 32,
                        charset: 'hex'
                    });
                }

                models.label = value;
                models.locale = locale;
            }
        }
    });
</script>