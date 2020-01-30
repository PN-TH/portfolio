export class Portfolio {
    id!: number;
    title!: string;
    image!: string;
    description!: string;
    url!: string;
    theme!: string;
    techno!: string;
    user_id!: number;
  
    constructor(input: Portfolio) {
      Object.assign(this, input);
  }
  }