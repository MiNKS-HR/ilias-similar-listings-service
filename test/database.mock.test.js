// import mockingoose from 'mockingoose';
// import SimExperience from '../db/model.js';
const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const { SimExperience } = require('../db/model.js')
 
describe('test mongoose SimExperience model', () => {

  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });


  it('should create a model instantiation with properties id and experience_category', () => {
    const mock = new SimExperience({ 
            id:1,
            experience_category:"Ford",
            experience_location:"China",
            experience_title:"Pseudoleistes virescens",
            experience_rating_average:1,
            experience_price:416,
            experience_rating_count:326,
            experience_photo_url:"http://dummyimage.com/235x158.png/ff4444/ffffff"
    });
    
    return mock.validate().then(() => {
        expect(mock.toObject()).toHaveProperty('id');
        expect(mock.toObject()).toHaveProperty('experience_category');
      });
  });

  it('should find an entry with id 1', () => {
    const schema = mongoose.Schema({
      name: String,
      email: { type: String, required: true },
      created: { type: Date, default: Date.now }
    });

    const User = mongoose.model('User', schema);

    const mock = {
            id:1,
            experience_category:"Ford",
            experience_location:"China",
            experience_title:"Pseudoleistes virescens",
            experience_rating_average:1,
            experience_price:416,
            experience_rating_count:326,
            experience_photo_url:"http://dummyimage.com/235x158.png/ff4444/ffffff"
    };
    
    mockingoose.Experience.toReturn(mock, 'find');

    return SimExperience
      .find({'experience_category':'Ford'})
      .then(function(result){
        console.log('MOCK',mock)
        console.log('RESULT', result)
        expect(JSON.parse(JSON.stringify(result))).toMatchObject(mock);
        expect(result.toObject()).toHaveProperty('_id')
      });
  })
  
})