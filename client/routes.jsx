import SimilarExperience from './components/SimilarExperience.jsx';
const routes = [
  { path: '/', action: () => <SimilarExperience pathname={`/id/1`}/> },
  { path: '/id/:id', action: ({params}) => {
      return <SimilarExperience pathname={`/id/${params.id}`}/> 
    }
  }
];

export default routes;