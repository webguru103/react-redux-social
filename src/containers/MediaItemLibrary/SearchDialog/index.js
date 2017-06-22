import React from 'react';
import {Tab, Tabs} from 'react-toolbox';
import PPDialog from 'elements/atm.Dialog';
import Wrapper from './Wrapper';
import TextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';
import SearchResultsContainer from './SearchResultsContainer';
import Spinner from 'elements/atm.Spinner';
import SearchItem from '../SearchItem';

class SearchDialog extends React.Component  {
  constructor(props) {
    super(props);
    
    this.state = {
      searchValue: '',
      isLoading: false,
      index: 1,
    };
    
    this.searchWeb = this.searchWeb.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.searchResults) {
      this.setState({ isLoading: false });
    }
  }
  
  handleInputChange(event) {
    this.setState({...this.state, searchValue: event.target.value});
  }
  
  handleTabChange = (index) => {
    this.setState({index});
  }
  
  searchWeb(){ 
    const query = this.state.searchValue;
    this.props.searchWeb(query);
    this.setState({ isLoading: true });
  }
  
  render() {
    return(
      <PPDialog
        active={this.props.searchDialog}
        title='Search Web'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
      >
        <Wrapper>
          <div style={{ clear: 'both' }}>
            <TextField floatingLabelText='Search' type='text' onChange={this.handleInputChange} style={{ float: 'left' }}/>
            <Button primary label='Search' onClick={this.searchWeb} style={{ float: 'left', marginTop: '30px', marginLeft: '10px'}} />
          </div>
          <SearchResultsContainer>
            { this.state.isLoading && <Spinner /> }
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
                      <SearchItem key={i} item={item}  handleClick={this.props.handleAddLinkValueFromDialog} />
                    )}
                  </Tab>
              </Tabs>
            }
          </SearchResultsContainer>
        </Wrapper>
      </PPDialog>  
    );
  }
}

export default SearchDialog;