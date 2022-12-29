export class Rental {
    id?: string;
    movieId!: string;
    userId!: string;
    dateOut?: Date;
    dateReturn?: Date;
    rentalFee!: number;
}