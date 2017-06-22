/*
 * Search
 *
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tab, Tabs } from 'react-toolbox';

import TextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';

import BING_LOGO from 'assets/images/bing_logo.png';
import loadingImage from 'assets/images/loading_circle.gif';

import SearchResultsContainer from './SearchResultsContainer';
import SearchItem from './SearchItem';

const Wrapper = styled.div`
  height:100%;
  max-width: 800px;
  margin: auto;
  padding: 20px 0;
  position: relative;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  img {
    width: 80px;
  }
  p {
    text-align: right;
    padding: 0;
    margin: 0;
    color: #616669;
    font-family: Lato;
    font-size: 12px;line-height: 15px;
  }
`;

class Search extends Component {
  static propTypes = {
    searchResults: PropTypes.arrayOf(PropTypes.shape()),
    searchWeb: PropTypes.func,
    handleAddLinkValueFromDialog: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      isLoading: false,
      index: 0,
    };

    this.searchWeb = this.searchWeb.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults) {
      this.setState({ isLoading: false });
    }
  }

  handleInputChange(event) {
    this.setState({ ...this.state, searchValue: event.target.value });
  }

  handleTabChange = (index) => {
    this.setState({ index });
  }

  searchWeb() {
    const query = this.state.searchValue;
    this.props.searchWeb(query);
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <Wrapper>
        <div style={{ clear: 'both' }}>
          <TextField
            floatingLabelText="Search"
            type="text"
            onChange={this.handleInputChange}
            style={{ float: 'left', width: '400px' }}
          />
          <Button
            primary
            label="Search"
            onClick={this.searchWeb}
            style={{ float: 'left', marginTop: '30px', marginLeft: '10px' }}
          />
        </div>
        <SearchResultsContainer>
          { this.state.isLoading &&
            <div className="loading">
              <img role="presentation" src={loadingImage} />
            </div>
          }
          { !this.state.isLoading && this.props.searchResults &&
            <Tabs index={this.state.index} onChange={this.handleTabChange}>
              <Tab label="Web">
                { this.props.searchResults.web && this.props.searchResults.web.map((item, i) =>
                  <SearchItem key={i} item={item} handleClick={this.props.handleAddLinkValueFromDialog} />
                )}
              </Tab>
              <Tab label="Video">
                { this.props.searchResults.video && this.props.searchResults.video.map((item, i) =>
                  <SearchItem key={i} item={item} handleClick={this.props.handleAddLinkValueFromDialog} />
                )}
              </Tab>
              <Tab label="News">
                { this.props.searchResults.news && this.props.searchResults.news.map((item, i) =>
                  <SearchItem key={i} item={item} handleClick={this.props.handleAddLinkValueFromDialog} />
                )}
              </Tab>
            </Tabs>
          }
        </SearchResultsContainer>
        <LogoWrapper>
          <p>Powered by</p>
          <img role="presentation" src={BING_LOGO} />
        </LogoWrapper>
      </Wrapper>
    );
  }
}

export default Search;
