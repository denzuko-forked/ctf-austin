const config = require('config')

describe('/#/forgot-password', () => {
  let email, securityAnswer, newPassword, newPasswordRepeat, resetButton

  const EC = protractor.ExpectedConditions

  beforeEach(() => {
    browser.get('/#/logout')
    browser.get('/#/forgot-password')
    email = element(by.model('email'))
    securityAnswer = element(by.model('securityAnswer'))
    newPassword = element(by.model('newPassword'))
    newPasswordRepeat = element(by.model('newPasswordRepeat'))
    resetButton = element(by.id('resetButton'))
  })

  describe('as Jim', () => {
    it('should be able to reset password with his security answer', () => {
      email.sendKeys('jim@' + config.get('application.domain'))
      browser.wait(EC.visibilityOf(securityAnswer), 1000, 'Security answer field did not become visible')
      securityAnswer.sendKeys('Samuel')
      newPassword.sendKeys('I <3 Spock')
      newPasswordRepeat.sendKeys('I <3 Spock')
      resetButton.click()

      expect(element(by.css('.alert-info')).getAttribute('class')).not.toMatch('ng-hide')
    })

    protractor.expect.challengeSolved({challenge: 'Reset Jim\'s Password'})
  })

  describe('as Bender', () => {
    it('should be able to reset password with his security answer', () => {
      email.sendKeys('bender@' + config.get('application.domain'))
      browser.wait(EC.visibilityOf(securityAnswer), 1000, 'Security answer field did not become visible')
      securityAnswer.sendKeys('Stop\'n\'Drop')
      newPassword.sendKeys('Brannigan 8=o Leela')
      newPasswordRepeat.sendKeys('Brannigan 8=o Leela')
      resetButton.click()

      expect(element(by.css('.alert-info')).getAttribute('class')).not.toMatch('ng-hide')
    })

    protractor.expect.challengeSolved({challenge: 'Reset Bender\'s Password'})
  })

  describe('as Psiinon', () => {
    it('should be able to reset password with his security answer', () => {
      email.sendKeys('psiinon@gmail.com')
      browser.wait(EC.visibilityOf(securityAnswer), 1000, 'Security answer field did not become visible')
      securityAnswer.sendKeys('West-2082')
      newPassword.sendKeys('cHNpaW5vbkBnbWFpbC5jb20=')
      newPasswordRepeat.sendKeys('cHNpaW5vbkBnbWFpbC5jb20=')
      resetButton.click()

      expect(element(by.css('.alert-info')).getAttribute('class')).not.toMatch('ng-hide')
    })

    protractor.expect.challengeSolved({challenge: 'Reset Psiinon\'s Password'})
  })
})
