import express from 'express';
import loaders from './loaders';
import { FormationsController } from './controller/formations.controller';
import { ExperiencesController } from './controller/experiences.controller';
import { PortfoliosController } from './controller/portfolios.controller';
import { AuthController } from './controller/auth.controller';


async function startServer() {
    // Récupération de l'application initiale
    const app = express();

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    FormationsController(app);
    ExperiencesController(app);
    PortfoliosController(app);
    AuthController(app);


    // Démarrage du serveur une fois que tout est correctement init
    app.listen(3000, () => console.log('Express server is running'));
  }

startServer();
