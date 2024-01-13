Cypress.Commands.add('fillMandatoryFieldsAndSubmit', project => {

    cy.get('#firstName').type('Marcos Vinicius')
    cy.get('#lastName').type('Wolff')
    cy.get('#email').type('maviniciuswolff@gmail.com')
    cy.get('#phone').type('985869092')
    cy.get('#open-text-area').type('Estou apenas testando')
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
  })