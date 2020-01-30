import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(private genService: GenService) { }

  ngOnInit() {
    this.getPortfolio()
  }

  getPortfolio(){
    this.genService.getPortfolio().subscribe((response: any) => {
      this.genService.works = response;
    })
  };

}
