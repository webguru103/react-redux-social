import React from 'react';
import PPDialog from 'elements/atm.Dialog';
import Wrapper from './Wrapper';
import TextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class BlogEditorDialog extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorState: null,
    };
  }
  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  } 
  
  render() {
      return(
      <PPDialog
        active={this.props.blogEditorDialog}
        title='Create A Blog Post'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
      >
        <Wrapper>
          <Editor editorState={this.state.editorState} onEditorStateChange={this.onEditorStateChange} />
        </Wrapper>
      </PPDialog>  
    );
  }
};

export default BlogEditorDialog;