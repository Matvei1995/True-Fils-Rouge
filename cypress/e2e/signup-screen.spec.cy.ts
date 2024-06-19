// signup-screen.spec.js 
describe('SignUpScreen', () => {
    it('should handle sign up form submission', () => {
      cy.viewport(370, 812); //format de la fenêtre navigateur
      cy.visit('http://localhost:19006/'); // Visitez notre application React Native Web
    
      // Appuyer sur le bouton "S'inscrire"
      cy.contains("S'inscrire").click().then(() => {
        cy.log('Clicked on Sign Up');
      });
      cy.wait(2000);
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="name-input"]').length) {
          cy.log('Input is visible');
        } else {
          cy.log('Input is NOT visible');
        }
      });
      // Remplir le formulaire
      
      cy.get('[data-testid="name-input"]',{ timeout: 10000 }).should('be.visible').type('John');
      cy.wait(2000); // Attendre 2 secondes
      cy.get('[data-testid="city-input"]',{ timeout: 10000 }).should('be.visible').type('Paris');
      cy.get('[data-testid="email-input"]',{ timeout: 10000 }).should('be.visible').type('john@example.com');
      cy.get('[data-testid="password-input"]',{ timeout: 10000 }).should('be.visible').type('@Password123!');
      cy.get('[data-testid="password-input"]',{ timeout: 10000 }).should('be.visible').type('@Password123!');
  

      // Appuyer sur le bouton "S'inscrire"
      cy.contains("S'enregistrer").click();
      // Assertions
      cy.url().should('include', '/confirmation'); // Vérifier si la navigation a réussi (vers l'écran de confirmation)
      
      
    });
  });
  