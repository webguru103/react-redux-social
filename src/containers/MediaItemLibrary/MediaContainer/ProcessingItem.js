import React from 'react';
import styled from 'styled-components';
import Spinner from 'elements/atm.Spinner';

const Wrapper = styled.div`
  width: 250px;
  border-radius: 4px;
  background: #FFFFFF;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
  display: inline-block;
  margin: 15px;
  position: relative;
  float: left;
  height: 313px;
`;

const ProcessingItem = (props) => {
  return(
    <Wrapper>
      <Spinner style={{marginTop: '100px'}} />
    </Wrapper>
  );
};

export default ProcessingItem;