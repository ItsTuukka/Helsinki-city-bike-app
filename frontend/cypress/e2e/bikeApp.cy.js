describe('routes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Helsinki city bike app')
    cy.contains(
      'There is also a list of journeys represented as a sortable data table.'
    )
  })

  it('stations can be opened', () => {
    cy.get('#stations').click()
    cy.contains('Search station by name')
    cy.contains('Asentajanpuisto')
  })

  it('journeys can be opened', () => {
    cy.get('#journeys').click()
    cy.contains('Search journey by departure or return station')
    cy.contains('Länsisatamankuja')
  })
})

describe('stationlist', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stations')
  })

  it('right amount of stations per page', () => {
    cy.get('.station').should('have.length', 50)
  })

  it('changing page works', () => {
    cy.get('button').eq(2).click()
    cy.get('.station').should('have.length', 50)
    cy.contains('Haagan tori')
  })

  it('searching works', () => {
    cy.get('#stationFilter').type('Ympyrätalo')
    cy.contains('Ympyrätalo')
    cy.get('.station').should('have.length', 1)
  })

  it('single station is clickable', () => {
    cy.get('#stationLink').eq(0).click()
    cy.contains('Average distance: 2.88 km')
  })
})

describe('single station view', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stations/62e7b097cca7c527ff7cae78')
  })

  it('view is what is supposed to be', () => {
    cy.contains('Alakiventie')
    cy.contains('Total number: 1400')
    cy.contains('Average distance: 2.59 km')
  })

  it('language buttons work', () => {
    cy.contains('Alakiventie')
    cy.contains('Alakiventie 4, Helsinki')
    cy.get('#swedish').click()
    cy.contains('Understensvägen')
    cy.contains('Understensvägen 4, Helsingfors')
    cy.get('#finnish').click()
    cy.contains('Alakiventie')
    cy.contains('Alakiventie 4, Helsinki')
  })
})

describe('journeytable', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/journeys')
  })

  it('right amount of journeys per table', () => {
    cy.get('.tablerow').should('have.length', 100)
  })

  it('changing page works', () => {
    cy.get('button').eq(2).click()
    cy.wait(1000) //has to wait for the database to fetch new journeys
    cy.get('.tablerow').should('have.length', 100)
    cy.get('tr td:nth-child(1)').eq(0).contains('Piispansilta')
  })

  it('columns are sortable', () => {
    cy.get('tr td:nth-child(1)').eq(0).contains('Laajalahden aukio')
    cy.get('th').eq(0).click()
    cy.get('tr td:nth-child(1)').eq(0).contains('Albertinkatu')
    cy.get('th').eq(0).click()
    cy.get('tr td:nth-child(1)').eq(0).contains('Ympyrätalo')
    cy.get('tr td:nth-child(3)').eq(0).contains('2.72')
    cy.get('th').eq(2).click()
    cy.get('tr td:nth-child(3)').eq(0).contains('0.01')
    cy.get('th').eq(2).click()
    cy.get('tr td:nth-child(3)').eq(0).contains('6.45')
  })

  it('searching works', () => {
    cy.get('#journeyFilter').type('Hakaniemi')
    cy.get('tr td:nth-child(1)').eq(0).contains('Hakaniemi')
    cy.get('.tablerow').should('have.length', 2)
  })
})
