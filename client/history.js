// import createHistory from 'history/createBrowserHistory';


// export default createHistory();


let history

if (typeof document !== 'undefined') {
  const createBrowserHistory = require('history/createBrowserHistory').default

  history = createBrowserHistory()
}

export default history