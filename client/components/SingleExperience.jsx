import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class SingleExperience extends React.Component {
  constructor(props) {
    super(props);

    this.getCurrentPhotoNumber = this.getCurrentPhotoNumber.bind(this);
  }    

  getCurrentPhotoNumber (num) {
    let photoNumber = num.split('.png').join('').split('/').join('').substring(num.length-21);
    return photoNumber;
  }

  render () {
    let num = this.getCurrentPhotoNumber(this.props.currentSimExperience.experience_photo_url);
    let photoUrl = `http://res.cloudinary.com/dkchqxebb/image/upload/v1520128059/${num}.jpg`;
    return (
      <div 
        onClick={() => {this.props.handleSimilarClick(this.props.currentSimExperience.id)}}
        className="singleExperience_container">
        <div className="singleExperience_inner_container">
          <img className="singleExperience_img" src={photoUrl} width="237" height="158" />
          <div className="singleExperience_categoryPlace" style={{color: this.props.fontColor ? this.props.fontColor.color : '#c4c4c4'}}><span>{this.props.currentSimExperience.experience_category.toUpperCase()}</span> · <span>{this.props.currentSimExperience.experience_location.toUpperCase()}</span></div>
          <div className="singleExperience_title">{this.props.currentSimExperience.experience_title}</div>
          <div className="singleExperience_price">$<span>{this.props.currentSimExperience.experience_price}</span> per person</div>
          <div className="singleExperience_rating">
            <StarRatingComponent 
              name={'ratingStars'}
              value={this.props.currentSimExperience.experience_rating_average}
              editing={false}
              starColor={'#008489'}
              emptyStarColor={'#D8D8D8'}
              />
            <div className="singleExperience_ratingCount">{this.props.currentSimExperience.experience_rating_count}</div></div>
        </div>
      </div>
    )
  }
}

export default SingleExperience;