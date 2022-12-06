import { Position } from "../Contracts/Positions";

export class Restaurant {
    name: string;
    address: string;
    position: Position;
    constructor(name: string, address: string, position: Position) {
        this.name = name;
        this.address = address;
        this.position = position;
    }
}