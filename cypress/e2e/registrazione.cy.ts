describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/registrazione')
    cy.get('#registration-name').type('nome')
    cy.get('#registration-surname').type('cognome')
    cy.get('#registration-email').type('email@gmail.com')
    cy.get('#registration-phone').type('3402321252')
    cy.get('#registration-privacyAccept').click()
    cy.get('#registrationForm').submit() 
  })
})