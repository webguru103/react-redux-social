import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import theme from 'theme';

import Preview from 'components/Preview';

import PPDialog from 'elements/atm.Dialog';
import FontIcon from 'elements/atm.FontIcon';
import Button from 'elements/atm.Button';
import SimpleButton from 'elements/atm.SimpleButton';

import Wrapper from './Wrapper';

function PreviewDialog({ createPostSet, previewDialog, closeAllDialog, mediaItem }) {
  const mediaType = mediaItem.type;
  let iconName = '';

  switch (mediaType) {
    case 'link':
      iconName = 'fa-link';
      break;
    case 'video':
      iconName = 'fa-video-camera';
      break;
    case 'image':
      iconName = 'fa-picture-o';
      break;
    case 'file':
      iconName = 'fa-text-o';
      break;
    case 'document':
      iconName = 'fa-file-text-o';
      break;
    default:
      iconName = '';
      break;
  }

  return (
    <PPDialog
      active={previewDialog}
      onEscKeyDown={closeAllDialog}
      onOverlayClick={closeAllDialog}
    >
      {!isEmpty(mediaItem.properties) && <Wrapper>
        <div className="header-wrapper">
          <h3><i className={`fa ${iconName}`} />{mediaType}</h3>
          <button onClick={closeAllDialog}><FontIcon value="clear" /></button>
        </div>
        <Preview item={mediaItem} />
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <SimpleButton
            style={{ fontSize: '13px', marginRight: '20px' }}
            color={theme.textColor}
            onClick={closeAllDialog}
            noBorder
          >
            Close Preview
          </SimpleButton>
          <Button
            label="Add to Post"
            icon="add"
            primary
            style={{ margin: '5px' }}
            onClick={() => createPostSet(mediaItem)}
          />
        </div>
      </Wrapper>
      }
    </PPDialog>
  );
}

PreviewDialog.propTypes = {
  previewDialog: PropTypes.bool,
  mediaItem: PropTypes.shape(),
  createPostSet: PropTypes.func,
  closeAllDialog: PropTypes.func,
};

export default PreviewDialog;
