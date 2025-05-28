import express, { Request, Response } from 'express';

// Create router
const router = express.Router();

// Pets GET
router.get('/', async (request: Request, response: Response) => {
    // Get all pets that belong to the current logged-in user
    const pets = await request.db.pets.findMany({
        where: {
            user_pets: {
                every: {
                    user_id: request.user?.id ?? -1,
                },
            },
        },
        include: {
            pet_images: {
                select: {
                    url: true,
                },
            },
        },
    });

    //Return pets
    response.status(200).json(pets);
});

router.get('/:id', async (request: Request<{ id: number }>, response: Response) => {
    // Get pet by id (only if it belongs to the user)
    const pet = await request.db.pets.findFirstOrThrow({
        where: {
            id: request.params.id ?? -1,
            user_pets: {
                every: {
                    user_id: request.user?.id ?? -1,
                },
            },
        },
        include: {
            pet_images: {
                select: {
                    url: true,
                },
            },
        },
    });

    //Return pet
    response.status(200).json(pet);
});

// Export router
export default router;
