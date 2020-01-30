import { Formation } from './../models/formation';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class FormationsRepository {

    private static instance: FormationsRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'formation';

    static getInstance() {
        if (!this.instance) {
            this.instance = new FormationsRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all formations and return it in a promise.
     */
    findAll(): Promise<Formation[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((formation: any) => new Formation(formation));
          });
    }

    /**
     * Make a query to the database to retrieve one formation by its id in parameter. 
     * Return the formation found in a promise.
     * @param id formation id
     */
    findById(id: number): Promise<Formation> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Formation(results[0]));
    }


    /**
     * Make a query to the database to insert a new formation and return the created formation in a promise.
     * @param formation formation to create
     */
    insert(formation: Formation) {
      return this.connection.query(
        `INSERT INTO ${this.table} (title, society, description, date, user_id) VALUES (?,?,?,?,?)`,
        [formation.title, formation.society, formation.description, formation.date, formation.user_id]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing formation and return the updated formation in a promise.
     * @param formation formation to update
     */
    update(formation: Formation) {
      return this.connection.query(
        `UPDATE ${this.table} SET title = ?, society = ?, description = ?, date = ?, user_id = ?, WHERE id = ?`,
        [formation.title, formation.society, formation.description, formation.date, formation.user_id, formation.id]
      ).then(() => {
        return this.findById(formation.id);
      });
    }

    /**
     * Make a query to the database to delete an existing formation and return an empry promise
     * @param id formation id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}