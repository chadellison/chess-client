Feature('Home Page')

Scenario('user can move piece', (I) => {
  I.amOnPage('/')
  I.executeScript("document.getElementById('31').click();")
  I.click('div#f3')
  I.dontSee('Invalid Move')
})

Scenario('user sees invalid move error when the user makes an invalid move', (I) => {
  I.amOnPage('/')
  I.executeScript("document.getElementById('31').click();")
  I.click('div#f4')
  I.see('Invalid Move')
})

Scenario('user sees that it is black\'s turn when user tries to move twice', (I) => {
  I.amOnPage('/')
  I.executeScript("document.getElementById('31').click();")
  I.click('div#f3')
  I.executeScript("document.getElementById('20').click();")

  I.see('black\'s turn')
})

Scenario('user can do four move checkmate', (I) => {
  I.amOnPage('/')
  I.executeScript("document.getElementById('21').click();")
  I.click('div#e4')

  I.executeScript("document.getElementById('13').click();")
  I.click('div#e5')

  I.executeScript("document.getElementById('30').click();")
  I.click('div#c4')

  I.executeScript("document.getElementById('2').click();")
  I.click('div#c6')

  I.executeScript("document.getElementById('28').click();")
  I.click('div#h5')

  I.executeScript("document.getElementById('7').click();")
  I.click('div#f6')

  I.executeScript("document.getElementById('28').click();")
  I.click('div#f7')

  I.see('white Wins!')
})
