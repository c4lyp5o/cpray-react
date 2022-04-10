import { useState, useEffect } from 'react';
import { getTheQuran, giveTheQuran, Pagination } from './js/Helper';

function Quran() {

  const [intro, setIntro] = useState(true);
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [quran, setQuran] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    async function Awwalun() {
      setSurah(await getTheQuran());
    }    
    Awwalun();
    document.title = "Al-Quran"
  }, []);

  function TheIntro() {
    if (intro === true) {
      return (
        <p className='centered'>Assalamualaikum</p>
      );
    }
  }

  async function handleSubmit(event) {
      setQuran([]);
      event.preventDefault();
      await giveTheQuran(search).then(data => {
        setQuran(data);
        setIntro(false);
        setDisplay(true);
      });
    }
  
  async function handleClick(event) {
    setSearch(event.target.value);
  }  

  function QuranData(props) {
      const { text, audio, translation, number } = props.data;
      return (
          <div className="quranAyats">
              <h3 className="quranic">{text.arab} ({number.inSurah})</h3>
              <p>{translation.id}</p>
              <audio controls>
              <source src={audio.primary} />
              Your browser does not support the audio element.
              </audio>
          </div>
      );
  }

  function PaginateQuran() {
    if (display)
      return (
          <Pagination
          data={quran}
          RenderComponent={QuranData}
          pageLimit={5}
          dataLimit={10}
          />
      );
  }

  return (
    <main className="container">
    <div className="grid">
        <div>
          <form onSubmit={handleSubmit}>
            <select className='damnbuttons' onClick={handleClick} id="surah" required="" name="surah">
              <option value="">Sila pilih surah...</option>
              {surah.map((thesurah, index) => (
                <option key={index} value={index}>{thesurah.transliteration}</option>
              ))}
            </select>
            <button type="submit" value="Submit">Pilih</button> 
          </form>
        </div>
        <div />
        <div />
        <div>
          <h1>Al Quran</h1>
        </div>
      </div>
      <div>{PaginateQuran()}</div>
      {TheIntro()}
      <br /><br />
    </main>
  );
}
  
  export default Quran;