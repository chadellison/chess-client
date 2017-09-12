Feature('Home Page')

Scenario('user can see side bar', (I) => {
  I.amOnPage('/')
  I.see('Sign In')
  I.see('Sign Up')
  I.see('Move Log')
  I.see('Reset')
})
