require("babel-core/register");
require("babel-polyfill");
import React from 'react';
import SimilarExperience from './components/SimilarExperience.jsx';
import ReactDOM from 'react-dom';
import historyA from './history.js';
import router from './router.js';
import routes from './routes.jsx';

// function render(location) {
//   ReactDOM.render(
//     React.createElement(SimilarExperience, {pathname: location}),
//     document.getElementById('similarExperience')
//   );
// };
// render('/id/1');
// history.push('/id/1')
// history.listen(render);



const container = document.getElementById('similarExperience');
function renderComponent(component) {
  ReactDOM.render(component, container);
}
function render(location) {
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, {...location, error})
    .then(renderComponent));
}
render(historyA.location); // render the current URL
historyA.listen(render);   // render subsequent URLs

//export default render;
window.SimilarExperience = SimilarExperience;