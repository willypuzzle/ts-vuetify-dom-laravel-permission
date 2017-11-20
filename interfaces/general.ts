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

export {
    StateSelectItem,
    TableDefinition
}