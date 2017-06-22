/*
 * Blog
 *
 *
 */

import React from 'react';
import styled from 'styled-components';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { convertToHTML } from 'draft-convert';
import debounce from 'lodash.debounce';
import { convertFromHTML, ContentState, convertToRaw, EditorState } from 'draft-js';

const Wrapper = styled.div`
  height:100%;
  width:100%;
`;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorState: this.getInitialStateFromHTMLValue(props.activeMediaItem),
    };
  }
  
  //componentWillUnmount() {
  //  this.unmounted = true;
 // }
  
  componentDidMount() {
    if (this.props.params.media_id) {
      console.log('component mounte');
      this.props.setActiveMediaItemId(this.props.params.media_id);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.media_id && (nextProps.params.media_id !== this.props.params.media_id)) {
      console.log('in set activeMediaItem');
      this.props.setActiveMediaItemId(nextProps.params.media_id);
    }

    if(nextProps.activeMediaItem && nextProps.activeMediaItem.properties) {
      console.log('initialize content');
      this.setState({ editorState: this.getUpdatedStateFromHTMLValue(nextProps.activeMediaItem.properties.html)});
    }
  }
  
  getInitialStateFromHTMLValue = value => {
    let editorState;
  console.log(value);
    if (value && value.properties && value.properties.html) {
      const blocksFromHTML = convertFromHTML(value.properties.html);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
      //editorState = EditorState.set(editorState);
    }
    else {
      editorState = EditorState.createEmpty();
    }

    return editorState;
  }
  
  getUpdatedStateFromHTMLValue = value => {
    console.log(value);
    const { editorState } = this.state;
    const blocksFromHTML = convertFromHTML(value);
    const nextContentState = ContentState.createFromBlockArray(blocksFromHTML);

    return EditorState.push(editorState, nextContentState);
  }
  
  initializeContent = (html) => {
    let editorState;
    if (html) {
    const contentBlocks = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }
    console.log(editorState);
    this.setState({ editorState });
  }

  
  debouncedOnChange = debounce(() => { console.log('on change')}, 100)

  handleChange = editorState => {
    const prevValue = convertToHTML(this.state.editorState.getCurrentContent());
    const nextValue = convertToHTML(editorState.getCurrentContent());

    if (!this.unmounted) {
      this.setState({ editorState }, () => {
        if (prevValue !== nextValue) {
          this.debouncedOnChange(nextValue);
        }
      });
    }
  }
  
  render() {
    const { editorState } = this.state;
    //console.log(editorState);
    return (
      <Wrapper>
        <div style={{maxWidth: '600px'}}>
         <Editor editorState={editorState} onEditorStateChange={this.handleChange} />
        </div>
      </Wrapper>
    );
  }
}

export default UserCanAccount(Blog);
