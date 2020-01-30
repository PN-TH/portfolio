export class Experience {
    id!: number;
    title!: string;
    society!: string;
    description!: string;
    date!: string;
    user_id!: number;
  
    constructor(input: Experience) {
      Object.assign(this, input);
  }
  }