
export interface User {
    name?: string;
    position: {
        lat: number;
        lng: number;
    };
    inRoom?: boolean;
    room: string;
    id: string
}