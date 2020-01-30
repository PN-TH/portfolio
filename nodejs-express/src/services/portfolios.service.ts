import { PortfoliosRepository } from './../repository/portfolios.repository';
import { Portfolio } from './../models/portfolio';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les portfolio doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class PortfoliosService {

    // Make service => singletonTransportfolio de notre service en singleton
    private static instance: PortfoliosService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new PortfoliosService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: PortfoliosRepository;
    private constructor() {
        this.repository = PortfoliosRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of portfolios.
     */
    getAll(): Promise<Portfolio[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the portfolio relative to the id in parameter.
     * @param id portfolio id
     */
    getById(id: number): Promise<Portfolio> {
        return this.repository.findById(id);
    }

    /**
     * Create a new portfolio and return a promise which contains the created portfolio.
     * @param portfolio portfolio to create
     */
    create(portfolio: any): Promise<Portfolio> {
      return this.repository.insert(portfolio);
    }

    /**
     * Update the portfolio in parameter and return a promise which contains the updated portfolio.
     * @param portfolio portfolio to update
     */
    update(portfolio: any): Promise<Portfolio> {
      return this.repository.update(portfolio);
    }

    /**
     * Delete the portfolio related to the id in parameter. Return an empty promise.
     * @param id portfolio id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
