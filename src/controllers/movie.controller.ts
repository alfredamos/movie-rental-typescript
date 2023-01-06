import {PrismaClient} from "@prisma/client";
import {Request, Response, } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { UuidTool } from "uuid-tool";

import {Movie} from "../models/movie.model";

const prisma = new PrismaClient();


const createMovie = async(req: Request, res: Response) => {
    const {body: newMov} = req;
    const newMovie = newMov as Movie;

    const genreId = newMovie.genreId;

    const genre = await prisma.genre.findUnique({
        where: {id: genreId},
    })

    if (!genre){
        throw catchError(StatusCodes.NOT_FOUND, `Genre with id = ${genreId} doesn't exist, please provide a valid genre from the available list.`);
    }

    const movie = await prisma.movie.create({
       data: {...newMovie},
    });

    res.status(StatusCodes.CREATED).json(movie);
};


const deleteMovie = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const movie = await prisma.movie.findUnique({
       where: {id},
    });

    if (!movie){
        throw catchError(StatusCodes.NOT_FOUND, `Movie with id = ${id} is not found`);
    }

    const deletedMovie = await prisma.movie.delete({
        where: {id},
    });

    res.status(StatusCodes.OK).json(deletedMovie);
};


const editMovie = async(req: Request, res: Response) => {
    const {body: movToUpdate} = req;
    const movieToUpdate = movToUpdate as Movie;
    const {id} = req.params;

    let isEqual = UuidTool.compare(id, movieToUpdate.id);
    if (!isEqual){
        throw catchError(StatusCodes.BAD_REQUEST, 'Id mismatch');
    }

    const genreId = movieToUpdate.genreId;

    const genre = await prisma.genre.findUnique({
        where: {id: genreId},
    })

    if (!genre){
        throw catchError(StatusCodes.NOT_FOUND, `Genre with id = ${genreId} doesn't exist, please provide a valid genre from the available list.`);
    }
    
    const movie = await prisma.movie.findUnique({
       where: {id},
    });

    if (!movie){
        throw catchError(StatusCodes.NOT_FOUND, `Movie with id = ${id} is not found`);
    }

    const updatedMovie = await prisma.movie.update({
       where: {id},
       data: {...movieToUpdate},
    });

    res.status(StatusCodes.OK).json(updatedMovie);
};

const getAllMovies = async(req: Request, res: Response) => {
    const movies = await prisma.movie.findMany({
        include: {
            genre: true,
            rentedMovies: true,
        }
    });

    res.status(StatusCodes.OK).json(movies);
};


const getMovieById = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const movie = await prisma.movie.findUnique({
       where: {id},
       include: {
        genre: true,
        rentedMovies: true,
       }
    });

    if (!movie){
        throw catchError(StatusCodes.NOT_FOUND, `Movie with id = ${id} is not found`);
    }

    res.status(StatusCodes.OK).json(movie);
};

export {
    createMovie,
    deleteMovie,
    editMovie,
    getAllMovies,
    getMovieById
}
