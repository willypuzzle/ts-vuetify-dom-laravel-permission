import axios, {AxiosStatic} from 'axios'

interface StateSelectItem {
    text: string;
    value: any;
}

interface TableDefinition {
    axios?: AxiosStatic,
    inputs?: {
        name: {
            validation?: string
        }
    }
}

interface StateDefinition {
    STATE_ENABLED: number,
    STATE_DISABLED: number;
}

export {
    StateDefinition,
    StateSelectItem,
    TableDefinition
}