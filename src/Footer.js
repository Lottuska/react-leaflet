import "./Footer.css";
import React, { useState } from 'react';

function Footer() {
  const [showInfo, setShowInfo] = useState(false);
  let width = matchMedia("all and (max-width: 700px)")
  if (width.matches) {
    return (
      <div>
        <span className="material-symbols-outlined info-symbol" onClick={() => setShowInfo(!showInfo)}>
        info
        </span>
        { showInfo ? <FooterContent /> : null }
      </div>
    );
  }
  else {
    return (
      <div className="description">
        <p>
          Data-aineisto Oulun kaupungin hyvinvointikeskusten, terveysasemien ja hyvinvointipisteiden sijainneista on ladattu <a href="https://www.avoindata.fi/data/fi/dataset/hyvinvointikeskusten-terveysasemien-ja-hyvinvointipisteiden-sijainnit1">Avoindata.fi</a>stä. ja se on julkaistu lisenssillä <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
        </p>
      </div>
    );
  }
}

const FooterContent = () => (
  <div className="description mobile">
    <p>
      Data-aineisto Oulun kaupungin hyvinvointikeskusten, terveysasemien ja hyvinvointipisteiden sijainneista on ladattu <a href="https://www.avoindata.fi/data/fi/dataset/hyvinvointikeskusten-terveysasemien-ja-hyvinvointipisteiden-sijainnit1">Avoindata.fi</a>stä. ja se on julkaistu lisenssillä <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
    </p>
  </div>
)

export default Footer;
