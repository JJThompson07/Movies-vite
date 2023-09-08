const items = require("../../src/movies.json")

describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173').as('app') // change URL to match your dev URL
  })
  it('contains movie-app element', () => {
    cy.get('div[data-test-id="movie-app"').as('movieApp')
  });

  it('contains 3 movies on load', () => {
    cy.get('.movie').should('have.length', 3)
  })
})

describe('update a movie', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173').as('app') // change URL to match your dev URL
  })
  const movies = items.items;
  for (const movieData of movies) {
    it(`clicking on movie item ${movieData.id} will show the movie form containing the correct data in the movie form`, () => {
    
      cy.get(`[data-test-id="movie-${movieData.id}"`).as('movie');
  
      cy.get('@movie').click();
  
      cy.get('[data-test-id="movie-form"]').as('movieForm');
  
      cy.get('input[id="name"]').should('have.value', movieData.name);
      cy.get('textarea[id="description"]').should('have.value', movieData.description);
      cy.get('input[id="image"]').should('have.value', movieData.image);
      cy.get('select[id="genres"]').should(($input) => {
        const val = $input.val();
  
        expect(Array.isArray(val)).to.eq(true)
  
        for (const genre of val) {
          expect(movieData.genres).to.include(genre)
        }
      });

      cy.get('#cancel-form').click()
      
    });
  }
})