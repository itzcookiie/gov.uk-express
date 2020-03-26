require('dotenv').config()
require('should')

const Dogs = require('../../src/services/dogs')
const service = new Dogs(process.env.API_URL)
let created

describe('dogs', function () {

  it('get create a dog', function () {
    let item = { name: 'Tom', description: 'Friend of Jerry' }
    return service.create(item).then((data) => {
      data.name.should.eql(item.name)
      data.description.should.eql(item.description)
      data.should.have.property('id')
      created = data
    })
  })

  it('get a created dog', function () {
    return service.get(created.id).then((data) => {
      data.name.should.eql(data.name)
      data.id.should.eql(data.id)
      data.description.should.eql(data.description)
    })
  })

  it('get all dogs', function () {
    return service.all().then((data) => {
      data.should.have.property('length')
    })
  })

  it('get delete a dog', function () {
    return service.delete(created.id).then((data) => {
      data.should.containEql(created)
    })
  })

})
