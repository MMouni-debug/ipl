
// Write your code here
import {Component} from 'react'
// import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount = () => {
    this.gettingTeamsList()
  }

  gettingTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const teamsData = await response.json()
    console.log(teamsData)
    const formattedData = teamsData.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))
    console.log(formattedData)
    this.setState({
      teamsList: formattedData.sort(() => Math.random() - 0.5),
      isLoading: false,
    })
  }

  render() {
    const {teamsList, isLoading} = this.state
    console.log(teamsList)
    return (
      <div className="background-card">
        <div className="heading-container">
          <img
            className="ipl-logo-style"
            alt="ipl logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          />
          <h1 className="heading-style">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        ) : (
          <div className="teams-container">
            {teamsList.map(eachTeam => (
              <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}
export default Home
