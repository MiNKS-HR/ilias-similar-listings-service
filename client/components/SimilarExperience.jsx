import React from 'react';
import SingleExperience from './SingleExperience.jsx';
import Slider from 'react-slick';
import axios from 'axios';
import $ from 'jquery';


class SimilarExperience extends React.Component {
  constructor() {
    super();

    this.state = {
      currentMainExperience: {},
      currentSimilarExperiences: []
    }
    
    this.fetch = this.fetch.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.createSimilar = this.createSimilar.bind(this);
    this.createMain = this.createMain.bind(this);
  }

  componentDidMount() {
    this.createMain(1);
    this.createSimilar("China");
  }


  fetch(id, callback) {
    axios.get( `/experience/similar/${id}`)
    .then(function (response) {
      console.log('Success', response.data);
      callback(response.data)
    })
    .catch(function (error) {
      console.log('Errorhhhh', error);
    });
  }

  fetchLocations(loc, callback) {
    axios.get(`/experience/similar/location/${loc}`)
    .then(function (response) {
      console.log('Success', response.data);
      callback(response.data)
    })
    .catch(function (error) {
      console.log('Errorhhhh', error);
    });
  }

  createMain (id) {
    this.fetch(id, (data) => {
      this.setState({
        currentMainExperience: data[0]
      });
    })
  }

  createSimilar(loc) {
    this.fetchLocations(loc, (data) => {
      this.setState({
        currentSimilarExperiences: data
      });
    })

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
        breakpoint: 770,
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
          <h1>Similar Experiences in <span>{this.state.currentMainExperience.experience_location}</span></h1>
        </div>
        <div className="simExpMain">
         {this.state.currentSimilarExperiences.length > 0 && <Slider {...settings}>
          {this.state.currentSimilarExperiences.map((item, index) => {
            return  <div key={index}>
                      <SingleExperience 
                        currentSimExperience={item} 
                        currentMainExperience={this.state.currentMainExperience}
                        
                        />
                    </div>
          })
          }
        </Slider>}
        </div>
      </div>
    ) 
  }

};



export default SimilarExperience;