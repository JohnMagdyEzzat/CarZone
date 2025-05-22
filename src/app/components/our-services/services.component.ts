import { Component, OnInit } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';
import {
  faCar,
  faFileAlt,
  faCalculator,
  faMoneyBill,
  faSyncAlt,
  faCalendarCheck,
  faBookOpen,
  faSearch,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports: [ServiceCardComponent],
})
export class ServicesComponent implements OnInit {
  ourServicesCards = [
    {
      cardTitle: 'Buy New & Used Cars',
      description:
        'Browse a wide selection of new and certified pre-owned vehicles from trusted dealers.',
      icon: faCar,
    },
    {
      cardTitle: 'Sell Your Car',
      description:
        'List your car easily and reach thousands of potential buyers—no hidden fees.',
      icon: faMoneyBill,
    },
    {
      cardTitle: 'Car Valuation Tool',
      description:
        'Instantly get a fair market estimate for your vehicle’s value using our smart calculator.(Soon)',
      icon: faCalculator,
    },
    {
      cardTitle: 'Vehicle History Reports',
      description:
        'Access detailed reports (e.g. accidents, servicing, ownership) for transparency.',
      icon: faFileAlt,
    },
    {
      cardTitle: 'Trade-In Services',
      description:
        'Trade in your old car and get its value deducted from your next purchase.',
      icon: faSyncAlt,
    },
    {
      cardTitle: 'Home Test Drive',
      description:
        'Schedule a test drive and we’ll bring the car to your home (select areas only).',
      icon: faCalendarCheck,
    },
    {
      cardTitle: 'Inspection Services',
      description: 'Book third-party inspections for peace of mind.',
      icon: faSearch
    },
    {
      cardTitle: 'Documentation Support',
      description:
        'We help handle registration, title transfer, and other paperwork hassle-free.',
      icon: faBookOpen,
    },
    {
      cardTitle: '24/7 Customer Support',
      description:
        'Our support team is available anytime to assist you with your queries.',
      icon: faComments,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
