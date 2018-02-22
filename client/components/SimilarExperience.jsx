import React from 'react';
import SingleExperience from './SingleExperience.jsx';
import Slider from 'react-slick';
import axios from 'axios';
import $ from 'jquery';


class SimilarExperience extends React.Component {
  constructor() {
    super();

    this.state = {
      count: [1,1,1,1,1,1,1,1]
    }
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount () {
    this.fetch();
  }


  fetch () {
    axios.post('/experience/similar', {
      params: {
        ID: 1
      }
    })
    .then(function (response) {
      console.log('Success', response.data);
    })
    .catch(function (error) {
      console.log('Errorhhhh', error);
    });
    // $.ajax({
    //   url: 'http://localhost:3003/experience/similar',
    //   method: 'GET',
    //   success: (result) => {
    //     console.log('Success', result);
    //   },
    //   error: (err) => {
    //     console.log('Error', err);
    //   }
    // })
  }

  render () {
    const settings =  {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]};
    return (
      <div className="simExpApp">
        <div className="simExpHeadline">
          <h1>Similar Experiences in Bali</h1>
        </div>
        <div className="simExpMain">
         <Slider {...settings}>
          {this.state.count.map((item, index) => {
            return  <div><SingleExperience key={index}/></div>
          })
          }
        </Slider>
        </div>
      </div>
    ) 
  }

};



export default SimilarExperience;