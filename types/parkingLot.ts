export interface ParkingLot {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    coveredLots: number;
    uncoveredLots: number;
    hasDoorman: boolean;
    hasParkingBarrier: boolean;
    hasAccessibility: boolean;
    hasCamera: boolean;
    hasVallet: boolean;
    hasWash: boolean;
    tier: string;
    acceptsVouchers: boolean;
    priceRange: number;
    address: string;
    number: string;
    operatingSchedule: [
        {
            day: number;
            open: string;
            close: string;
        }
    ];
    image: string;
}