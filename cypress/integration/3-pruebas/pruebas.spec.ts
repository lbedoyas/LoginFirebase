describe('Login', () => {
  let userData;
  before(() => {
    cy.fixture('example.json').then(($dataUser) => userData = $dataUser)
  });

  it('Deberia existir los siguiente labels', () => {
    cy.visit('/registro')
    cy.contains('Email');
    cy.contains('Nombre');
    cy.contains('Contraseña');
    cy.get('.login100-form-title-1').contains('Login Firebase')
  });

  it('Deberia existir los labels invocado dese comando', () => {
    cy.labelsLogin()
  });

  it('La validacion de las credenciales son falsas', () => {
    cy.visit('/registro')
    cy.contains('ya tienes cuenta / Ingresar').click()
    cy.get('input[name="username"]').type('lucholucho')
    cy.get('input[name="pass"]').type('lucho')
    cy.get('#login').click()
    cy.wait(1000)
    cy.get('.text-danger').should('be.visible')
    cy.contains('El correo o usuario es obligatorio')
    cy.screenshot('try-sign-in-user')
  });

  it('Deberia logear un usuario', () => {
    cy.visit('/registro')
    cy.contains('ya tienes cuenta / Ingresar').click()
    cy.get('input[name="username"]').type(userData.user)
    cy.get('input[name="pass"]').type(userData.pass)
    cy.screenshot('sign-in-user', { blackout: ['input[name="username"]'] })
    cy.get('#login').click()
    cy.wait(1000)
    cy.url().should('contain', '/home')
    cy.contains('Mi aplicacion').should('be.visible')
  });

  after(()=> {
    cy.log('test finalizados')
  })

});
