import React from 'react';

export default function Video({ src }) {
return (
<div className="embed-responsive embed-responsive-16by9">
<iframe
     className="embed-responsive-item"
     src={src}
     allowFullScreen
     title="video"
   />
</div>
);
}