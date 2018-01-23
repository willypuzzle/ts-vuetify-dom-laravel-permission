<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        props:{
            eventBusConfiguration: {
                type: Object,
                default(){
                    return {};
                }
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

            }
        }
    });
</script>