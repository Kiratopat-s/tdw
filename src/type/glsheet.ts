export type signData = {
    timestamp: string;
    email: string;
    status: `in` | `out`;
    accuracy: number;
    latitude: number;
    longitude: number;
    altitude: number | null;
    heading: number | null;
    speed: number | null;
    linkmap: string;
};

export type Geo = {
    accuracy: number;
    latitude: number;
    longitude: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
};