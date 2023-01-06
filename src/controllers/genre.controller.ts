import {PrismaClient} from "@prisma/client";
import {Request, Response, } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import {Genre} from "../models/genre.model";
import {UuidTool} from "uuid-tool"

const prisma = new PrismaClient();


const createGenre = async(req: Request, res: Response) => {
    const {body: newGen} = req;
    const newGenre = newGen as Genre;

    const genre = await prisma.genre.create({
       data: {...newGenre},
    });

    res.status(StatusCodes.CREATED).json(genre);
};


const deleteGenre = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const genre = await prisma.genre.findUnique({
       where: {id},
    });

    if (!genre){
        throw catchError(StatusCodes.NOT_FOUND, `Genre with id = ${id} is not found`);
    }

    const deletedGenre = await prisma.genre.delete({
        where: {id},
    });

    res.status(StatusCodes.OK).json(deletedGenre);
};


const editGenre = async(req: Request, res: Response) => {
    const {body: genToUpdate} = req;
    const genreToUpdate = genToUpdate as Genre;
    const {id} = req.params;

    let isEqual = UuidTool.compare(id, genreToUpdate.id);
    if (!isEqual){
        throw catchError(StatusCodes.BAD_REQUEST, 'Id mismatch');
    }
    
    const genre = await prisma.genre.findUnique({
       where: {id},
    });

    if (!genre){
        throw catchError(StatusCodes.NOT_FOUND, `Genre with id = ${id} is not found`);
    }

    const updatedGenre = await prisma.genre.update({
       where: {id},
       data: {...genreToUpdate},
    });

    res.status(StatusCodes.OK).json(updatedGenre);
};

const getAllGenres = async(req: Request, res: Response) => {
    const genres = await prisma.genre.findMany({
        include:{
            movies: true,
        }
    });

    res.status(StatusCodes.OK).json(genres);
};


const getGenreById = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const genre = await prisma.genre.findUnique({
       where: {id},
       include: {
        movies: true,
       }
    });

    if (!genre){
        throw catchError(StatusCodes.NOT_FOUND, `Genre with id = ${id} is not found`);
    }

    res.status(StatusCodes.OK).json(genre);
};

export {
    createGenre,
    deleteGenre,
    editGenre,
    getAllGenres,
    getGenreById
}
