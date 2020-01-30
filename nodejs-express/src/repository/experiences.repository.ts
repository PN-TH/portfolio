import { Experience } from './../models/experience';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class ExperiencesRepository {

    private static instance: ExperiencesRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'experience';

    static getInstance() {
        if (!this.instance) {
            this.instance = new ExperiencesRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all experiences and return it in a promise.
     */
    findAll(): Promise<Experience[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((experience: any) => new Experience(experience));
          });
    }

    /**
     * Make a query to the database to retrieve one experience by its id in parameter. 
     * Return the experience found in a promise.
     * @param id experience id
     */
    findById(id: number): Promise<Experience> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Experience(results[0]));
    }


    /**
     * Make a query to the database to insert a new experience and return the created experience in a promise.
     * @param experience experience to create
     */
    insert(experience: Experience) {
      return this.connection.query(
        `INSERT INTO ${this.table} (title, society, description, date, user_id) VALUES (?,?,?,?,?)`,
        [experience.title, experience.society, experience.description, experience.date, experience.user_id]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing experience and return the updated experience in a promise.
     * @param experience experience to update
     */
    update(experience: Experience) {
      return this.connection.query(
        `UPDATE ${this.table} SET title = ?, society = ?, description = ?, date = ?, user_id = ? WHERE id = ?`,
        [experience.title, experience.society, experience.description, experience.date, experience.user_id, experience.id]
      ).then(() => {
        return this.findById(experience.id);
      });
    }

    /**
     * Make a query to the database to delete an existing experience and return an empry promise
     * @param id experience id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}