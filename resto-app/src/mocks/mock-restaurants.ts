import { Restaurant } from "../Models/Restaurant";
import { mockPositions } from './mock-positions';

export const mockRestaurants: Restaurant[] = [
    new Restaurant("La Balle au bond", "75006 Prom. Marceline Loridan-Ivens, 75006 Paris", mockPositions[0]),
    new Restaurant("Coffee Crepes", "24 Quai du Louvre, 75001 Paris", mockPositions[1]),
    new Restaurant("BaoBao Tea", "10 Rue Dauphine, 75006 Paris", mockPositions[2]),
]