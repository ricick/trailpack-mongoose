/* global describe, it */
'use strict'

const expect = require('chai').expect
const mongoose = require('mongoose')

describe('FootprintService', () => {

  let FootprintService

  before(() => {
    FootprintService = global.app.services.FootprintService
  })

  it('should exist', () => {
    expect(global.app.api.services['FootprintService']).exist
    expect(global.app.services.FootprintService).to.be.an('object')
  })

  describe('#create', () => {

    it('fail if wrong Model', () => {
      return FootprintService
        .create('Something', {})
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })

  })

  describe('#find', () => {

    it('fail if wrong model', () => {
      return FootprintService
        .find('Something')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })
  })

  describe('#update', () => {

    it('fail if wrong model', () => {
      return FootprintService
        .update('Something')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })
  })

  describe('#destroy', () => {

    it('fail if wrong model', () => {
      return FootprintService
        .destroy('Something')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })
  })

  describe('#_getReferenceModelName', () => {

    let User

    before(() => {
      User = global.app.orm.User
    })

    it('should exist', () => {
      expect(FootprintService._getReferenceModelName).to.be.an('function') // eslint-disable-line
    })

    it('false if no model or reference', () => {
      expect(FootprintService._getReferenceModelName({})).to.be.false // eslint-disable-line
      expect(FootprintService._getReferenceModelName(User)).to.be.false // eslint-disable-line
      expect(FootprintService._getReferenceModelName(User, [])).to.be.false // eslint-disable-line
    })

    it('false if no such reference in model', () => {
      expect(FootprintService._getReferenceModelName(User, 'nonExisting')).to.be.false // eslint-disable-line
    })

    it('return model with correct reference', () => {
      const role = FootprintService._getReferenceModelName(User, 'roles') // eslint-disable-line
      expect(role).to.be.eq('Role')
    })
  })

  describe('#createAssociation', () => {

    it('fail if wrong model', () => {
      return FootprintService
        .createAssociation('Something')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })

    it('fail with no parentId', () => {
      return FootprintService
        .createAssociation('User')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parentId provided')
        })
    })

    it('fail if no reference exist', () => {
      return FootprintService
        .createAssociation('User', 1, 'nonExisting')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No such reference exist')
        })
    })

    it('fail if no parent record exist', () => {
      const id = mongoose.Types.ObjectId() // eslint-disable-line
      return FootprintService
        .createAssociation('User', id, 'role')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parent record found')
        })
    })

  })

  describe('#findAssociation', () => {

    it('should exist', () => {
      expect(FootprintService.findAssociation).to.be.a('function')
    })

    it('fail if wrong parentModel', () => {
      return FootprintService
        .findAssociation()
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })

    it('fail if no parentId provided', () => {
      return FootprintService
        .findAssociation('User')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parentId provided')
        })
    })

    it('fail if no parentModel exsit', () => {
      return FootprintService
        .findAssociation('User', mongoose.Types.ObjectId(), 'role') // eslint-disable-line
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parent record found')
        })

    })

    it('fail if no reference exist', () => {
      return FootprintService
        .findAssociation('User', 1, 'nonExisting')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No such reference exist')
        })
    })
  })

  describe('#updateAssociation', () => {

    it('should exist', () => {
      expect(FootprintService.updateAssociation).to.be.a('function')
    })

    it('fail if wrong parentModel', () => {
      return FootprintService
        .updateAssociation()
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })

    it('fail if no parentId provided', () => {
      return FootprintService
        .updateAssociation('User')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parentId provided')
        })
    })

    it('fail if no parentModel exsit', () => {
      return FootprintService
        .updateAssociation('User', mongoose.Types.ObjectId(), 'role') // eslint-disable-line
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parent record found')
        })

    })

    it('fail if no reference exist', () => {
      return FootprintService
        .updateAssociation('User', 1, 'nonExisting')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No such reference exist')
        })
    })
  })

  describe('#destroyAssociation', () => {

    it('should exist', () => {
      expect(FootprintService.destroyAssociation).to.be.a('function')
    })

    it('fail if wrong parentModel', () => {
      return FootprintService
        .destroyAssociation()
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No model found')
        })
    })

    it('fail if no parentId provided', () => {
      return FootprintService
        .destroyAssociation('User')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parentId provided')
        })
    })

    it('fail if no parentModel exsit', () => {
      return FootprintService
        .destroyAssociation('User', mongoose.Types.ObjectId(), 'role') // eslint-disable-line
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No parent record found')
        })

    })

    it('fail if no reference exist', () => {
      return FootprintService
        .destroyAssociation('User', 1, 'nonExisting')
        .then(() => Promise.reject())
        .catch((err) => {
          expect(err).to.be.an('error')
            .and.to.have.property('message', 'No such reference exist')
        })
    })
  })
})
