import React from "react";

function ShareButton() {
  const shareUrl = window.location.href;

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          url: shareUrl,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.log("Share failed", error));
    } else {
      console.log("Web Share API not supported on this browser.");
    }
  };

  return <button onClick={share}>Share</button>;
}

export default ShareButton;
