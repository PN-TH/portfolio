export class Formation {
    id!: number;
    title!: string;
    school!: string;
    description!: string;
    date!: string;
    user_id!: number;
  
    constructor(input: Formation) {
      Object.assign(this, input);
  }
  }