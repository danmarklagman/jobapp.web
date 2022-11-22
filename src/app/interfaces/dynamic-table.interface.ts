import { TableHeaderInterface } from "./table-header.interface";

export interface DynamicTableInterface {
    headers?: TableHeaderInterface[];
    data?: any[];
}