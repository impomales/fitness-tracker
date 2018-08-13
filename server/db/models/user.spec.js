/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('getters', () => {
    let isaias

    beforeEach(async () => {
      isaias = await User.create({
        username: 'Isaias',
        email: 'impomales@gmail.com',
        password: 'ompaaa',
        weight: 150.5,
        height: 67
      })
    })

    it('can get the weight of a user in the form of a string', () => {
      expect(isaias.weightStr).to.equal('150.5 lbs')
    })

    it("can get a user's height in user friendly form", () => {
      expect(isaias.height).to.equal('5\'7"')
    })
  })
}) // end describe('User model')
