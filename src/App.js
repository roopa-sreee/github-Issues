import {Component} from 'react'

import {Oval} from 'react-loader-spinner'

import Navbar from './components/Navbar'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    issuesData: [],
    apiStatus: apiStatusConstants.initial,
    showRepoHistory: false,
    visitedRepos: [],
  }

  componentDidMount() {
    this.getIssuesData()
  }

  getIssuesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'http://localhost:5000/user/1000'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        issuesData: data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getIssuesData()
  }

  onClickVisitedRepos = async () => {
    const apiUrl = 'http://localhost:5000/visited-repos'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedRepos = data.repoName

    this.setState({
      visitedRepos: fetchedRepos,
      showRepoHistory: true,
    })
  }

  renderIssuesView = () => {
    const {issuesData, showRepoHistory, visitedRepos} = this.state
    return (
      <div className="app-container">
        <Navbar />
        <div className="details-container">
          <p className="user-id">User Id : {issuesData.userId}</p>
          <div className="options">
            <p className="total-issues">
              Open-issues : {issuesData.totalOpenIssues}
            </p>
            <p className="total-issues" onClick={this.onClickVisitedRepos}>
              Visited repos
            </p>
          </div>
        </div>
        <div className="lists-con">
          <ul className="issues-list">
            <li className="list-item">
              <p className="key">Issues open in 24 hours </p>
              <p className="value"> : {issuesData.issuesOpenedInTheDay}</p>
            </li>
            <li className="list-item">
              <p className="key">Issues opened in the last 7 days</p>
              <p className="value"> : {issuesData.issuesOpenedInAWeek}</p>
            </li>
            <li className="list-item">
              <p className="key">Issues opened a week ago</p>
              <p className="value"> : {issuesData.issuesOpenedBeforeAweek}</p>
            </li>
          </ul>
          {showRepoHistory ? (
            <ul className="repos-visited-list">
              {visitedRepos.map(eachRepo => (
                <li className="list-item">{eachRepo.repoName}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Oval color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-con">
      <h1 className="failure-text">Something Went Wrong</h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderIssuesView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default App
