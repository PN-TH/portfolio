import { Experience } from './../models/experience';
import { ExperiencesService } from './../services/experiences.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ExperiencesController = (app: Application) => {

    const router: Router = express.Router();
    const experiencesService = ExperiencesService.getInstance();

    /**
     * Return all experiences in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      experiencesService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one experience in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      experiencesService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new experience from a JSON body and return the created experience in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const experience: Experience = req.body; // Automatically transform in a experience object

      experiencesService.create(experience).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a experience relative to its id and return the updated experience in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const experience: Experience = req.body; // req.params.id is automatically set into the body

      experiencesService.update(experience).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a experience relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      experiencesService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/experiences', router);
};