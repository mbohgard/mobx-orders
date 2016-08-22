import React, { Component } from 'react'
import { observer } from 'mobx-react'
const Loader = require('react-loaders').Loader;

@observer
class Search extends Component {
  search(e) {
    this.props.search(e.target.value)
  }

  resetSearch() {
    this.props.search()
  }

  render() {
    let buttonClasses = 'reset-button'

    if (this.props.value) buttonClasses += ' active'

    return (
      <div className="search">
        <input
          className="search-input"
          onChange={ this.search.bind(this) }
          value={ this.props.value }
        />

        <Loader type="ball-scale-multiple" active={ this.props.loading } />

        <button
          className={ buttonClasses }
          onClick={this.resetSearch.bind(this) }
          disabled={ !this.props.value }
        >Rensa sökningen</button>
      </div>
    )
  }
}

export default Search
