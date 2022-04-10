import { useState, useEffect } from 'react';
import { getTheKeetab, giveTheKeetab, Pagination } from './js/Helper';

function Hadith() {
  
  const [intro, setIntro] = useState(true);
  const [hadith, setHadith] = useState([]);
  const [search, setSearch] = useState("");
  const [keetab, setKeetab] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    async function Awwalun() {
      setKeetab(await getTheKeetab());
    }    
    Awwalun();
    document.title = "Hadith";
  }, []);

  function TheIntro() {
    if (intro === true) {
      return (
        <p className='centered'>Assalamualaikum</p>
      );
    }
  }

  async function handleSubmit(event) {
    setHadith([]);
    event.preventDefault();
    await giveTheKeetab(search).then(data => {
        setHadith(data);
        setIntro(false);
        setDisplay(true);
    });
  }

  async function handleChange(event) {
    setSearch(event.target.value);
  }

  function HadithData(props) {
    const { arab, id } = props.data;
    return (
        <div className="quranAyats">
            <p className="hadis">{arab}</p>
            <p>{id}</p>
        </div>
    );
}

function PaginateHadith() {
  if (display)
    return (
        <Pagination
        data={hadith}
        RenderComponent={HadithData}
        pageLimit={5}
        dataLimit={1}
        />
    );
}

  return (
    <main className="container">
    <div className="grid">
        <div>
          <form onSubmit={handleSubmit}>
            <select className='damnbuttons' onChange={handleChange} id="keetab" required="" name="keetab">
              <option value="">Sila pilih kitab...</option>
              {keetab.map((solkeetab) => (
                <option key={solkeetab.id} value={solkeetab.id}>{solkeetab.name}</option>
              ))}
            </select>
            <button type="submit" value="Submit">Pilih</button> 
          </form>
        </div>
        <div />
        <div />
        <div>
          <h1>Hadith</h1>
        </div>
      </div>
      <div>{PaginateHadith()}</div>
      {TheIntro()}
    </main>
  );
}
  
  export default Hadith;