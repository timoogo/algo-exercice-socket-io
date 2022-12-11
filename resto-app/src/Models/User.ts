import { Position } from './../Contracts/Positions';
import {Restaurant} from "./Restaurant";
export interface User {
    name: string;
    position: Position;
    inRoom?: boolean;
    room?: string;
    id: string,
    myChoice?: Restaurant
}