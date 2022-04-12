function Radio() {
  return (
    <>
    <main className="container">
    <div className="radio-centered">
    <ul>
        <li className="radiolist">
            <span className="radiotext">
            <a href="https://radioonline.co.id/#rodja" title="Radio Rodja (Bogor)">
            <img class="cover" src="https://cdn.webrad.io/images/logos/radioonline-co-id/rodja.png" alt="Radio Rodja (Bogor)" height="66" width="96">
            </img>
            </a>
            </span>
            <audio controls>
                <source src="https://radioislamindonesia.com/rodja.mp3?_=2" />
            </audio>
        </li>
        <li className="radiolist">
            <span className="radiotext">
            <a href="https://radioonline.co.id/#muslim" title="Radio Muslim">
            <img class="cover" src="https://cdn.webrad.io/images/logos/radioonline-co-id/muslim.png" alt="Radio Muslim" height="66" width="96" />                
            </a>
            </span>
            <audio controls>
                <source src="https://cp.phpmystream.com/radioSSLnew/s/75" />
            </audio>
        </li>
        <li class="radiolist">
            <span>
            <a href="https://radioonline.co.id/#bass-salatiga" title="Radio Bass (Salatiga)">
            <img class="cover" src="https://cdn.webrad.io/images/logos/radioonline-co-id/bass-salatiga.png" alt="Radio Bass (Salatiga)" height="66" width="96" />
            </a>
            </span>
            <audio controls>
                <source src="http://live.bassfm.id/;" type='audio/mp3' />
            </audio>
        </li>
    </ul>
    </div>
    </main>
    </>
    );
}

export default Radio;