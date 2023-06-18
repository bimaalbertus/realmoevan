import { forwardRef } from 'react';
import styled from 'styled-components'

function Scroll ({text}, ref) {
    return (
    <Video ref={ref}>
    <iframe width="2160" height="720" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen" allowfullscreen></iframe> 
    </Video>
    )
}

const Video = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 0px 0px;
  min-height: 56px;
`;
export default forwardRef(Scroll)