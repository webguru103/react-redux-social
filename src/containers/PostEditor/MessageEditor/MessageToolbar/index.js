import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'elements/atm.Tooltip';

import Wrapper from './Wrapper';
import ToolbarButton from './ToolbarButton';
import Divider from './Divider';
import LimitIndicator from './LimitIndicator';

const TooltipToolbarButton = Tooltip(ToolbarButton);

function MessageToolbar({ characterLimit, openFilePicker, openLinkDialog, openMediaLibrary, urls, shortenUrl }) {
  return (
    <Wrapper>
      <TooltipToolbarButton tooltip="Open Content Library" tooltipDelay={200} width={30} marginLeft={12} marginRight={12} onClick={openMediaLibrary}><i className="fa fa-database" /></TooltipToolbarButton>
      <Divider />
      <TooltipToolbarButton tooltip="Upload Content" tooltipDelay={200} width={30} marginLeft={12} onClick={openFilePicker}><i className="fa fa-upload" /></TooltipToolbarButton>
      <TooltipToolbarButton tooltip="Insert Link" tooltipDelay={200} width={30} marginRight={12} onClick={openLinkDialog}><i className="fa fa-link" /></TooltipToolbarButton>
      <Divider />
      {urls && urls.length ?
        <ToolbarButton width={75} onClick={shortenUrl} fontSize={10}>Shorten URL</ToolbarButton>
      :
        null
      }
      {urls && urls.length ?
        <Divider />
      :
        null
      }
      <LimitIndicator className={characterLimit < 0 && 'negative'}>{characterLimit}</LimitIndicator>
    </Wrapper>
  );
}

MessageToolbar.propTypes = {
  characterLimit: PropTypes.number,
  openFilePicker: PropTypes.func,
  openLinkDialog: PropTypes.func,
  openMediaLibrary: PropTypes.func,
  urls: PropTypes.array,
  shortenUrl: PropTypes.func,
};

export default MessageToolbar;
