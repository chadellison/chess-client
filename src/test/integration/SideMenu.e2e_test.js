Feature('Side Menu')

Scenario('user can see side bar', (I) => {
  I.amOnPage('/')
  I.see('Sign In')
  I.see('Sign Up')
  I.see('Move Log')
  I.see('Reset')
})

Scenario('user can see the game log', (I) => {
  I.amOnPage('/')
  I.executeScript("document.getElementById('21').click();")
  I.click('div#e4')

  I.executeScript("document.getElementById('13').click();")
  I.click('div#e5')

  I.executeScript("document.getElementById('31').click();")
  I.click('div#f3')

  I.click('Move Log')
  I.see('White')
  I.see('Black')
  I.see('pawn: e4')
  I.see('pawn: e5')
  I.see('knight: f3')

  I.click('Hide')

  I.dontSee('White')
  I.dontSee('Black')
  I.dontSee('pawn: e4')
  I.dontSee('pawn: e5')
  I.dontSee('knight: f3')
  I.see('Move Log')
})

Scenario('user can reset the game', (I) => {
  I.amOnPage('/')
  I.executeScript("document.getElementById('21').click();")
  I.click('div#e4')

  I.executeScript("document.getElementById('13').click();")
  I.click('div#e5')

  I.executeScript("document.getElementById('31').click();")
  I.click('div#f3')

  I.click('Move Log')
  I.see('White')
  I.see('Black')
  I.see('pawn: e4')
  I.see('pawn: e5')
  I.see('knight: f3')

  I.click('Reset')

  I.see('White')
  I.see('Black')
  I.dontSee('pawn: e4')
  I.dontSee('pawn: e5')
  I.dontSee('knight: f3')
})
