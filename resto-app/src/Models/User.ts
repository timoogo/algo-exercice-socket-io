import { Position } from './../Contracts/Positions';
export interface User {
    name?: string;
    position?: Position;
    inRoom?: boolean;
    room?: string;
    id?: number
}