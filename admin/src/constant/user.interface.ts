import { MongoResponse } from "@/constant/interfaces";

export interface Address {
	address: string;
	latitude: number;
	longitude: number;
	state: string;
	country: string;
	zip: string;
}
export enum DriverTripStatus {
	New = 'new',
	Started = 'started',
	Completed = 'completed',
	Cancelled = 'cancelled',
}
export enum PassengerPreferenceStatus {
	New = 'new',
	ConfirmWithDriver = 'confirmWithDriver',
	Paid = 'paid',
	Cancelled = 'cancelled',
	Completed = 'completed',
}

export interface IUserTrip extends MongoResponse {
	pickup: Address;
	dropOff: Address;
	distance?: string;
	departureDateTime: Date;
	seatRequired: number;
	price: number;
	description?: string;
	cancellationReason: string;
	pickupLocation: {
		type: string;
		coordinates: [number, number];
	};
}

export interface IPassengerPreference extends IUserTrip {
	passengerId: string;
	seatRequired: number;
	status?: PassengerPreferenceStatus;
	isDeleted: boolean;
}

export interface IDriverTrip extends IUserTrip {
	driverId: string;
	status?: DriverTripStatus;
	totalSeats: number;
	totalSeatAvailable: number;
	carId: string;
	isDeleted: boolean;
}

export interface NotificationPayload {
	title: string;
	body: string;
	data?: { [key: string]: any };
}
