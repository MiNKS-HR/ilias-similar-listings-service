import React from 'react';
import ReactDOM from 'react-dom';
import SingleExperience from './SingleExperience.jsx';
import Slider from 'react-slick';
import axios from 'axios';
import $ from 'jquery';
import Vibrant from 'node-vibrant';
//import createHistory from 'history/createBrowserHistory';
import history from '../history.js';
 

class SimilarExperience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMainExperience: {},
      currentSimilarExperiences: [],
      slickGoTo:0,
      fontColors: []
    }
    
    this.fetch = this.fetch.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.createSimilar = this.createSimilar.bind(this);
    this.createMain = this.createMain.bind(this);
    this.handleSimilarClick = this.handleSimilarClick.bind(this);
    this.setColors = this.setColors.bind(this);
  }

  componentDidMount() {
    // const url = window.location.href;
    // let curId = url.split('/')[4];
    // console.log('ID', curId);
    // console.log(this.props.pathname);
    // if(!curId) {
    //   history.push('/id/1');
    //   curId = 1;
    // }
    // //history.push(this.props.pathname)
    this.createMain(this.props.pathname.substr(4));
    ///this.createMain(curId);
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
    axios.get( `/similar/id/${id}`)
    .then(function (response) {
      console.log('Success', response.data);
      callback(response.data)
    })
    .catch(function (error) {
      console.log('ErrorID');
    });
  }

  fetchLocations(loc, callback) {
    axios.get(`/similar/location/${loc}`)
    .then(function (response) {
      console.log('Success', response.data);
      callback(response.data)
    })
    .catch(function (error) {
      console.log('ErrorLOC');
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
      data.forEach((l) => this.setColors(l));
      this.setState({
        currentSimilarExperiences: data
      });
    })
  }

  setColors(location) {
    const url = location.experience_photo_url;
    let curPhotoNum = url.split('.png').join('').split('/').join('').substring(url.length-21);
    let path = `http://res.cloudinary.com/dkchqxebb/image/upload/v1520128059/${curPhotoNum}.jpg`;
    let v = new Vibrant(path);
    return v.getPalette((err, palette) => {
      let newColor = palette.Vibrant.getHex();
      if(newColor) {
        this.setState({
          fontColors: [...this.state.fontColors, ...[{color: newColor, id: location.id }]]
        })
      }
    });
  }

  handleSimilarClick (id) {
    this.createMain(id);
    this.createSimilar('China');
    //history.push(`/id/${id}`);
    this.setState({
      slickGoTo:0,
      fontColors: []
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
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
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
                        fontColor={this.state.fontColors.find((c) => c.id === item.id)}
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