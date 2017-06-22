import {
  IS_LOADING_CHANNEL,
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUCCESS,
  FETCH_CHANNEL_ERR,
} from './constants';

export function isLoadingChannel() {
  return { type: IS_LOADING_CHANNEL };
}

export function fetchCurrentChannel(channelid) {
  return { type: FETCH_CHANNEL, channelid };
}

export function fetchCurrentChannelSuccess(channelInfo) {
  return { type: FETCH_CHANNEL_SUCCESS, channelInfo };
}

export function fetchCurrentChannelErr(err) {
  return { type: FETCH_CHANNEL_ERR, err };
}
