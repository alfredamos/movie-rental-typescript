import {PrismaClient} from "@prisma/client";
import {Request, Response, } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import {Rental} from "../models/rental.model";

const prisma = new PrismaClient();


const createRental = async(req: Request, res: Response) => {
    const {body: newRent} = req;
    const newRental = newRent as Rental;

    const rental = await prisma.rental.create({
       data: {...newRental},
    });

    res.status(StatusCodes.CREATED).json(rental);
};


const deleteRental = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const rental = await prisma.rental.findUnique({
       where: {id},
    });

    if (!rental){
        throw catchError(StatusCodes.NOT_FOUND, `Rental with id = ${id} is not found`);
    }

    const deletedRental = await prisma.rental.delete({
        where: {id},
    });

    res.status(StatusCodes.OK).json(deletedRental);
};


const editRental = async(req: Request, res: Response) => {
    const {body: rentToUpdate} = req;
    const rentalToUpdate = rentToUpdate as Rental;
    const {id} = req.params;
    
    const rental = await prisma.rental.findUnique({
       where: {id},
    });

    if (!rental){
        throw catchError(StatusCodes.NOT_FOUND, `Rental with id = ${id} is not found`);
    }

    const updatedRental = await prisma.rental.update({
       where: {id},
       data: {...rentalToUpdate},
    });

    res.status(StatusCodes.OK).json(updatedRental);
};

const getAllRentals = async(req: Request, res: Response) => {
    const rentals = await prisma.rental.findMany({
        include: {
            movie: true,
            user: true,
        }
    });

    res.status(StatusCodes.OK).json(rentals);
};


const getRentalById = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const rental = await prisma.rental.findUnique({
       where: {id},
    });

    if (!rental){
        throw catchError(StatusCodes.NOT_FOUND, `Rental with id = ${id} is not found`);
    }

    res.status(StatusCodes.OK).json(rental);
};

export {
    createRental,
    deleteRental,
    editRental,
    getAllRentals,
    getRentalById
}
