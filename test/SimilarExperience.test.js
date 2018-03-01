import React from 'react';
import SingleExperience from '../client/components/SingleExperience.jsx';
import SimilarExperience from '../client/components/SimilarExperience.jsx';
import renderer from 'react-test-renderer';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Test if SingleExperience component ', () => {
  test('has any unexpected DOM changes after code change', () => {
    const mockExp = {"id":1,"experience_category":"Ford","experience_location":"China","experience_title":"Pseudoleistes virescens","experience_rating_average":1,"experience_price":416,"experience_rating_count":326,"experience_photo_url":"http://dummyimage.com/235x158.png/ff4444/ffffff"};
    const wrapper = shallow(<SingleExperience
      currentSimExperience={mockExp}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders correct value into title div ', () => {
    const mockExp = {"id":1,"experience_category":"Ford","experience_location":"China","experience_title":"Pseudoleistes virescens","experience_rating_average":1,"experience_price":416,"experience_rating_count":326,"experience_photo_url":"http://dummyimage.com/235x158.png/ff4444/ffffff"};
    const wrapper = shallow(<SingleExperience
      currentSimExperience={mockExp}
      />);
    const title = wrapper.find('.singleExperience_title');
    console.log(title.text());
    expect(title.text()).toEqual('Pseudoleistes virescens');
  })
});

describe('Test if calling createMain method', () => {
  test('calls fetch method once', () => {
    const wrapper = shallow(<SimilarExperience pathname={'/id/1'} />);
    wrapper.instance().fetch= jest.fn();
    wrapper.update();
    // const anonymous = wrapper.instance().setState;
    wrapper.instance().createMain(1);
    console.log(wrapper.instance());
    expect(wrapper.instance().fetch).toHaveBeenCalledTimes(1);
    // expect(wrapper.instance().fetch).toHaveBeenCalledWith(1, anonymous);
  });
});



