import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class Search extends Component {
  search(e) {
    console.log(e.target.value)
  }

  render() {
    return (
      <div className="search">
        <input
          className="search-input"
          onChange={ this.search }
          value={ this.props.searchValue }
        />

        <button
          className="reset-button"
          onClick={ this.props.resetSearch }
        >Rensa sökningen</button>
      </div>
    )
  }
}

export default Search
