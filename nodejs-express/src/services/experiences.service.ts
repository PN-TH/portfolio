import { ExperiencesRepository } from './../repository/experiences.repository';
import { Experience } from './../models/experience';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les experience doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class ExperiencesService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: ExperiencesService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ExperiencesService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: ExperiencesRepository;
    private constructor() {
        this.repository = ExperiencesRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of experiences.
     */
    getAll(): Promise<Experience[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the experience relative to the id in parameter.
     * @param id experience id
     */
    getById(id: number): Promise<Experience> {
        return this.repository.findById(id);
    }

    /**
     * Create a new experience and return a promise which contains the created experience.
     * @param experience experience to create
     */
    create(experience: any): Promise<Experience> {
      return this.repository.insert(experience);
    }

    /**
     * Update the experience in parameter and return a promise which contains the updated experience.
     * @param experience experience to update
     */
    update(experience: any): Promise<Experience> {
      return this.repository.update(experience);
    }

    /**
     * Delete the experience related to the id in parameter. Return an empty promise.
     * @param id experience id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
