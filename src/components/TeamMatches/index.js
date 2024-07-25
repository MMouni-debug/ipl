import React, { Component } from 'react';
import LatestMatch from '../LatestMatch';
import MatchCard from '../MatchCard';

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getTeamMatches();
  }

  getTeamMatches = async () => {
    try {
      const { id } = this.props.match.params;
      this.setState({ isLoading: true });
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`);
      if (response.ok) {
        const data = await response.json();
        this.setState({
          teamBannerUrl: data.team_banner_url,
          latestMatchDetails: data.latest_match_details,
          recentMatches: data.recent_matches,
          isLoading: false,
        });
      } else {
        throw new Error('Failed to fetch team matches');
      }
    } catch (error) {
      console.error('Error fetching team matches:', error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      teamBannerUrl,
      latestMatchDetails,
      recentMatches,
      isLoading,
    } = this.state;

    return (
      <div className="team-matches-background-card container py-4">
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <img className="team-image img-fluid mb-4" src={teamBannerUrl} alt="Team Banner" />
            <h2 className="latest-matches-heading-style mb-3">Latest Match</h2>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <h2 className="latest-matches-heading-style mt-5 mb-3">Recent Matches</h2>
            <div className="row recent-matches-container">
              {recentMatches.map((match) => (
                <div className="col-md-4 mb-4" key={match.id}>
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default TeamMatches;
