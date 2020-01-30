import { Portfolio } from './../models/portfolio';
import { PortfoliosService } from './../services/portfolios.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const PortfoliosController = (app: Application) => {

    const router: Router = express.Router();
    const portfoliosService = PortfoliosService.getInstance();

    /**
     * Return all portfolios in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      portfoliosService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one portfolio in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      portfoliosService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new portfolio from a JSON body and return the created portfolio in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const portfolio: Portfolio = req.body; // Automatically transform in a portfolio object

      portfoliosService.create(portfolio).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a portfolio relative to its id and return the updated portfolio in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const portfolio: Portfolio = req.body; // req.params.id is automatically set into the body

      portfoliosService.update(portfolio).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a portfolio relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      portfoliosService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/portfolios', router);
};