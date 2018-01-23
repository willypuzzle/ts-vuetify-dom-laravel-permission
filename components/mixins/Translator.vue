<script lang="ts">
    import Vue from 'vue';
    import messages from '../../i18n/messages';
    import _ from 'lodash';


    export default Vue.extend({
        props: {
            locale: {
                type: String,
                default: 'it'
            },
        },
        methods: {
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
            }
        }
    });
</script>