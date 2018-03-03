import React from 'react';
import Vibrant from 'node-vibrant';
import StarRatingComponent from 'react-star-rating-component';

class SingleExperience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#000'
    }
    this.getCurrentPhotoNumber = this.getCurrentPhotoNumber.bind(this);

  } 

  componentWillReceiveProps() {
    let curPhotoNum = this.getCurrentPhotoNumber(this.props.currentSimExperience.experience_photo_url);
    let path = `http://res.cloudinary.com/dkchqxebb/image/upload/v1519579177/${curPhotoNum}.png`;
    let curColor = '#c4c4c4';
    let v = new Vibrant(path);
    let swatches = v.swatches();
    v.getPalette((err, palette) => {
      let newColor = palette.Vibrant.getHex() ? palette.Vibrant.getHex() : curColor;
      this.setState({
        color: newColor
      })
    });
  }    

  getCurrentPhotoNumber (num) {
    let photoNumber = num.split('.png').join('').split('/').join('').substring(num.length-21);
    //console.log(photoNumber);
    return photoNumber;
  }

  render () {
    let num = this.getCurrentPhotoNumber(this.props.currentSimExperience.experience_photo_url);
    let photoUrl = `http://res.cloudinary.com/dkchqxebb/image/upload/v1519579177/${num}.png`;
    return (
      <div 
        onClick={() => {this.props.handleSimilarClick(this.props.currentSimExperience.id)}}
        className="singleExperience_container">
        <div className="singleExperience_inner_container">
          <img className="singleExperience_img" src={photoUrl} width="237" height="158" />
          <div className="singleExperience_categoryPlace" style={{color: this.state.color}}><span>{this.props.currentSimExperience.experience_category.toUpperCase()}</span> · <span>{this.props.currentSimExperience.experience_location.toUpperCase()}</span></div>
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