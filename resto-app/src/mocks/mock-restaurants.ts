import { Restaurant } from "../Models/Restaurant";
import { mockPositions } from './mock-positions';

export const mockRestaurants: Restaurant[] = [
  // 3 restaurants
    {
        name: "Le Petit Bouchon",
        address: "1 rue de la Paix",
        position: mockPositions[0],
    },
    {
        name: "Le Grand Bouchon",
        address: "2 rue de la Paix",
        position: mockPositions[1],
    },
    {
        name: "Le Bouchon",
        address: "3 rue de la Paix",
        position: mockPositions[2],
    },
]