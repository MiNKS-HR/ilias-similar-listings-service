import React from 'react';
//import colorGrabber from 'react-native';
//import { colorsFromUrl } from 'react-native-dominant-color';
//import ColorThief from 'color-thief-jimp';
import * as Vibrant from 'node-vibrant';
import StarRatingComponent from 'react-star-rating-component';

class SingleExperience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#000'
    }

  } 

  componentDidMount() {
    Vibrant.from('http://res.cloudinary.com/dkchqxebb/image/upload/v1519349821/sample.jpg').getPalette((err, palette) => console.log(palette))
  }

  render () {
    return (
      <div className="singleExperience_container">
        <div className="singleExperience_inner_container">
          <img className="singleExperience_img" src={this.props.currentSimExperience.experience_photo_url} width="237" height="158" />
          <div className="singleExperience_categoryPlace"><span>{this.props.currentSimExperience.experience_category}</span> · <span>{this.props.currentSimExperience.experience_location}</span></div>
          <div className="singleExperience_title">{this.props.currentSimExperience.experience_title}</div>
          <div className="singleExperience_price">$<span>{this.props.currentSimExperience.experience_price}</span> per person</div>
          <div className="singleExperience_rating"><StarRatingComponent 
                                                      name={this.props.currentSimExperience._id}
                                                      value={this.props.currentSimExperience.experience_rating_average}
                                                      editing={false}
                                                      starColor={'#008489'}
                                                      emptyStarColor={'#D8D8D8'}
                                                      /><div className="singleExperience_ratingCount">{this.props.currentSimExperience.experience_rating_count}</div></div>
        </div>
      </div>
    )
  }
}

export default SingleExperience;