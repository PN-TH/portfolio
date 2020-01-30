import { Portfolio } from './../models/portfolio';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class PortfoliosRepository {

    private static instance: PortfoliosRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'portfolio';

    static getInstance() {
        if (!this.instance) {
            this.instance = new PortfoliosRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all portfolios and return it in a promise.
     */
    findAll(): Promise<Portfolio[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((portfolio: any) => new Portfolio(portfolio));
          });
    }

    /**
     * Make a query to the database to retrieve one portfolio by its id in parameter. 
     * Return the portfolio found in a promise.
     * @param id portfolio id
     */
    findById(id: number): Promise<Portfolio> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Portfolio(results[0]));
    }


    /**
     * Make a query to the database to insert a new portfolio and return the created portfolio in a promise.
     * @param portfolio portfolio to create
     */
    insert(portfolio: Portfolio) {
      return this.connection.query(
        `INSERT INTO ${this.table} (title, image, description, url, theme, techno, user_id) VALUES (?,?,?,?,?,?,?)`,
        [portfolio.title, portfolio.image, portfolio.description, portfolio.url, portfolio.theme, portfolio.techno, portfolio.user_id]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing portfolio and return the updated portfolio in a promise.
     * @param portfolio portfolio to update
     */
    update(portfolio: Portfolio) {
      return this.connection.query(
        `UPDATE ${this.table} SET title = ?, image = ?, description = ?, url = ?, theme = ?, techno = ?, user_id = ? WHERE id = ?`,
        [portfolio.title, portfolio.image, portfolio.description, portfolio.url, portfolio.theme, portfolio.techno, portfolio.user_id, portfolio.id]
      ).then(() => {
        return this.findById(portfolio.id);
      });
    }

    /**
     * Make a query to the database to delete an existing portfolio and return an empry promise
     * @param id portfolio id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}