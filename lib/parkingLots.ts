import { config } from "@/constants/config";
import { ParkingLot } from "@/types/parkingLot";

export const getParkinLots = async (): Promise<Array<ParkingLot> | null> => {
    try {
        const url = `${config.apiBaseUrl}/public/parkingLots`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error on fetch: ${res.status}`);
        }

        const data: Array<ParkingLot> = await res.json();

        return data;
    } catch (err) {
        return null;
    }
}