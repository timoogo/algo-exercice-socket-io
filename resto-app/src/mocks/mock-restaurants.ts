import { Restaurant } from "../Models/Restaurant";
import { mockPositions } from './mock-positions';

export const mockRestaurants: Restaurant[] = [
    new Restaurant("Restaurant 1", "75 rue du chateau, Paris 13", mockPositions[0]),
    new Restaurant("Restaurant 2", "32 allée des Cignes", mockPositions[1]),
    new Restaurant("Restaurant 3", "1 Boulevard des Maréchaux", mockPositions[2]),
]