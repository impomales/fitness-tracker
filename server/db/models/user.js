const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    defaultValue: 'user'
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  weight: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0
    },
    get() {
      return this.getDataValue('weight') + ' lbs';
    }
  },
  height: {
    // stored in inches.
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    // front end in form 5'6"
    get() {
      const heightInInches = this.getDataValue('height');
      const feet = heightInInches / 12;
      const inches = heightInInches % 12;
      return `${feet}'${inches}"`;
    },
    set(val) {
      let valArr = val.split("\'");
      const feet = Number(valArr[0]);
      valArr = valArr[1].split('\"');
      const inches = Number(valArr[0]);
      this.setDataValue('height', feet * 12 + inches);
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
