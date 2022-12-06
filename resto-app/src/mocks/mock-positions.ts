import {PositionComponent} from "./../Components/PositionComponent";
import {Position} from "./../Contracts/Positions";
export const mockPositions: Position[] = [
    new PositionComponent(Math.random() * 100, Math.random() * 100),
    new PositionComponent(Math.random() * 100, Math.random() * 100),
    new PositionComponent(Math.random() * 100, Math.random() * 100),
]
    