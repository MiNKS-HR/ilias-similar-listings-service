// import mockingoose from 'mockingoose';
// import SimExperience from '../db/model.js';
const mockingoose = require('mockingoose').default;
const SimExperience = require('../db/model.js')
 
describe('test mongoose SimExperience model', () => {
  it('should return the doc with findById', () => {
    const mock = new SimExperience.SimExperience({
            __v:0,
            _id:"5a8f25a500f42cfa87fe6f21",
            experience_category:"Ford",
            experience_location:"China",
            experience_photo_url:"http://dummyimage.com/235x158.png/ff4444/ffffff",
            experience_price:416,
            experience_rating_average:1,
            experience_rating_count:326,
            experience_title:"Pseudoleistes virescens",
            id:1
    });

    mockingoose.User.toReturn(mock, 'findOne'); // findById is findOne
    
    return mock.validate().then(() => {
        expect(mock.toObject()).toHaveProperty('id');
        expect(mock.toObject()).toHaveProperty('experience_category');
      });

    return SimExperience.SimExperience
      .find({ __id: "5a8f25a500f42cfa87fe6f21"})
      .then(result => {
        expect(result).toEqual(mock);
      })
  })
  
  // it('should return the doc with update', () => {
  //     const _doc = {
  //         _id: '507f191e810c19729de860ea',
  //         name: 'name',
  //         email: 'name@email.com'
  //     };
      
  //     mockingoose.User.toReturn(doc, 'update');
      
  //     return SimExperience
  //     .update({ name: 'changed' }) // this won't really change anything
  //     .where({ _id: '507f191e810c19729de860ea'})
  //     .then(doc => {
  //       expect(JSON.parse(JSON.stringify(doc)).toMatchObject(_doc);
  //     })
  //   })
})