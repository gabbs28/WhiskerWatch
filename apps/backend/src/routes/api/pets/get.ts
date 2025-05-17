import express, { Request, Response } from 'express';
import prisma from '@aa-mono-repo/prisma-client';


// Create router
const router = express.Router();

// 
router.get('/', async (request: Request, response: Response) => {
    
    const pets = await prisma.pets.findMany({
        where: {
            user_pets: {
                every: {
                    user_id: request.user?.id ?? -1
                }
            }
        },
        include: {
            pet_images: {
                select: {
                    url: true
                }
            }
        }
    });

    response.status(200).json(pets);
});

// 
router.get('/:id', async (request: Request<{id: number}>, response: Response) => {
    
    const pet = await prisma.pets.findFirstOrThrow({
        where: {
            id: request.params.id,
            user_pets: {
                every: {
                    user_id: request.user?.id ?? -1
                }
            }
        },
        include: {
            pet_images: {
                select: {
                    url: true
                }
            }
        }
    });

    response.status(200).json(pet);
});

// Export router
export default router;