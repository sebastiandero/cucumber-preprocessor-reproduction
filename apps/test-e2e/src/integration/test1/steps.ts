import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am on the page$/, () => {
  cy.visit('/');
});

Then(/^something should be displayed$/, () => {
  cy.contains('Resources');
});
