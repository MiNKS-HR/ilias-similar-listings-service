import React from 'react';
import ReactDOM from 'react-dom';
import SingleExperience from './SingleExperience.jsx';
import Slider from 'react-slick';
import axios from 'axios';
import $ from 'jquery';
//import createHistory from 'history/createBrowserHistory';
import history from '../history.js';
 

class SimilarExperience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMainExperience: {},
      currentSimilarExperiences: [],
      slickGoTo:0
    }
    
    this.fetch = this.fetch.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.createSimilar = this.createSimilar.bind(this);
    this.createMain = this.createMain.bind(this);
    this.handleSimilarClick = this.handleSimilarClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.pathname);
    //history.push(this.props.pathname)
    this.createMain(this.props.pathname.substr(4));
    this.createSimilar('China');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pathname !== this.props.pathname) {
      console.log(nextProps.pathname.substr(4));
      this.createMain(nextProps.pathname.substr(4));
      this.createSimilar('United States');
      Slider.SlickGoTo(1);
    }
  }

  fetch(id, callback) {
    axios.get( `/experience/similar/${id}`)
    .then(function (response) {
      console.log('Success', response.data);
      callback(response.data)
    })
    .catch(function (error) {
      console.log('Errorhhhh');
    });
  }

  fetchLocations(loc, callback) {
    axios.get(`/experience/similar/location/${loc}`)
    .then(function (response) {
      console.log('Success', response.data);
      callback(response.data)
    })
    .catch(function (error) {
      console.log('Errorhhhh');
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

  handleSimilarClick (id) {
    this.createMain(id);
    this.createSimilar('China');
    //history.push(`/id/${id}`);
    this.setState({
      slickGoTo:0
    })
  }


  render () {
    const settings =  {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      slickGoTo: this.state.slickGoTo,
      afterChange: (currentSlide) => {
        this.setState({
          slickGoTo:currentSlide
        });
      },
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
                        handleSimilarClick={this.handleSimilarClick}
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