import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search_keyword: ''
    }
  }

  onSearchKeywordChange(event) {
    this.setState({ search_keyword: event.target.value });
  }

  onFormSubmit(event) {
    const query = this.state.search_keyword;
    this.setState({ search_keyword: '' })
    event.preventDefault();
    browserHistory.push(`/restaurants?q=${query}`);
  }

  render() {
    return (
      <section className="home">
        <div className="container">
          <div className="d-flex align-items-center flex-row h-100">
            <div className="text-center w-100">
              <div>
                <p className="best-places">Find the best places to have Good-Eats</p>
              </div>
              <div>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                  {/* <select className="">
                    <option value="melbourne">Melbourne</option>
                  </select> */}
                  <input 
                    className="form-control main-search-input" 
                    placeholder="Search for restaurants or cuisines..." 
                    value={this.state.search_keyword}
                    onChange={this.onSearchKeywordChange.bind(this)} 
                  />
                  <button 
                    className="btn btn-warning" 
                    type="submit"
                    onSubmit={this.onFormSubmit.bind(this)}
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;