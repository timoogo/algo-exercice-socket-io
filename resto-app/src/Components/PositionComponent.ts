import { Position } from '../Contracts/Positions';

export class PositionComponent implements Position {
    lat: number;
    lng: number;

    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }
}