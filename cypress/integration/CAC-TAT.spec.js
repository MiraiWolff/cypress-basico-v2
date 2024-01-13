///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Marcos Vinicius')
        cy.get('#lastName').type('Wolff')
        cy.get('#email').type('maviniciuswolff@gmail.com')
        cy.get('#phone').type('985869092')
        cy.get('#open-text-area').type('Estou apenas testando')
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })
    it('usando delay', function(){
        cy.get('#firstName').type('Marcos Vinicius', {delay: 0})
        cy.get('#lastName').type('Wolff', {delay: 0})
        cy.get('#open-text-area').type('ashsahsahhsahsahsahsahsahsah', {delay: 0})
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Marcos Vinicius')
        cy.get('#lastName').type('Wolff')
        cy.get('#email').type('maviniciuswolffgmail.com')
        cy.get('#phone').type('985869092')
        cy.get('#open-text-area').type('Estou apenas testando')
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })
    it('Campo telefone continua vazio ao receber valor não numérico', function(){
        cy.get('#phone').type('aaaaaaaaaaaaaaaaaaaaaaaaa').should('have.text', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Marcos Vinicius')
        cy.get('#lastName').type('Wolff')
        cy.get('#email').type('maviniciuswolff@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Estou apenas testando')
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Marcos Vinicius')
          .should('have.value', 'Marcos Vinicius')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Wolff')
          .should('have.value', 'Wolff')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('maviniciuswolffgmail.com')
          .should('have.value', 'maviniciuswolffgmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
        .type('985869092')
        .should('have.value', '985869092')
        .clear()
        .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
    })
    it('enviando form pelo botão identificado pelo contains', function(){
        cy.get('#firstName').type('Marcos Vinicius')
        cy.get('#lastName').type('Wolff')
        cy.get('#email').type('maviniciuswolff@gmail.com')
        cy.get('#phone').type('985869092')
        cy.get('#open-text-area').type('Estou apenas testando')
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get(':nth-child(4) > input').check()
          .should('be.checked')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('#support-type > :nth-child(2) > input')
          .check()
          .should('be.checked')
        cy.get(':nth-child(3) > input')
          .check()
          .should('be.checked')
        cy.get(':nth-child(4) > input')
          .check()
          .should('be.checked')
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
  })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json', {encoding: null}).as('exampleFile')
      cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('a').should('have.attr', 'target', '_blank')
  })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um cliqueacessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('a')
        .invoke('removeAttr', 'target')
        .click()
  })
    it('testa a página da política de privacidade de forma independente', function(){
      cy.get('a')
        .invoke('removeAttr', 'target')
        .click()
      cy.get('#title').should('have.text','CAC TAT - Política de privacidade')
  })
})
