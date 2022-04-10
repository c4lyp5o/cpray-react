import { useEffect, useState } from "react";
import NodeCache from "node-cache";
let myCache = new NodeCache();

const ttl = 15552000; // 6 months
const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
const numberDay = (dayOfYear(new Date()) - 1);

const zoneReplace = {
  "kdh01": "KOTA SETAR, POKOK SENA DAN KUBANG PASU",
  "kdh02": "KUALA MUDA, PENDANG DAN YAN",
  "kdh03": "PADANG TERAP DAN SIK",
  "kdh04": "BALING",
  "kdh05": "KULIM DAN BANDAR BAHARU",
  "kdh06": "LANGKAWI",
  "kdh07": "GUNUNG JERAI",
  "mlk01": "SELURUH NEGERI MELAKA",
  "ngs01": "JEMPOL DAN TAMPIN",
  "ngs02": "PORT DICKSON, SEREMBAN, KUALA PILAH, JELEBU DAN REMBAU",
  "phg01": "PULAU TIOMAN",
  "phg02": "ROMPIN, PEKAN, MUADZAM SHAH DAN KUANTAN",
  "phg03": "MARAN, CHENOR, TEMERLOH, BERA, JENGKA DAN JERANTUT",
  "phg04": "BENTONG, RAUB DAN LIPIS",
  "phg05": "BUKIT TINGGI, GENTING SEMPAH, DAN JANDA BAIK",
  "phg06": "CAMERON HIGHLANDS, BUKIT FRASER DAN GENTING HIGHLANDS",
  "prk01": "TAPAH, SLIM RIVER DAN TANJUNG MALIM",
  "prk02": "IPOH, BATU GAJAH, KAMPAR, SG. SIPUT DAN KUALA KANGSAR",
  "prk03": "PENGKALAN HULU, GERIK DAN LENGGONG",
  "prk04": "TEMENGOR DAN BELUM",
  "prk05": "TELUK INTAN, BAGAN DATUK, KG. GAJAH, SERI ISKANDAR, BERUAS, PARIT, LUMUT, SITIAWAN DAN PULAU PANGKOR",
  "prk06": "SELAMA, TAIPING, BAGAN SERAI DAN PARIT BUNTAR",
  "prk07": "BUKIT LARUT",
  "pls01": "SELURUH NEGERI PERLIS",
  "png01": "SELURUH NEGERI PULAU PINANG",
  "sgr01": "HULU SELANGOR, GOMBAK, PETALING/SHAH ALAM, HULU LANGAT DAN SEPANG",
  "sgr02": "SABAK BERNAM DAN KUALA SELANGOR",
  "sgr03": "KLANG DAN KUALA LANGAT",
  "trg01": "KUALA TERENGGANU, MARANG DAN KUALA NERUS",
  "trg02": "BESUT DAN SETIU",
  "trg03": "HULU TERENGGANU",
  "trg04": "DUNGUN DAN KEMAMAN",
  "jhr01": "PULAU AUR DAN PULAU PEMANGGIL",
  "jhr02": "KOTA TINGGI, MERSING DAN JOHOR BAHRU",
  "jhr03": "KLUANG DAN PONTIAN",
  "jhr04": "BATU PAHAT, MUAR, SEGAMAT DAN GEMAS JOHOR",
  "ktn01": "JAJAHAN KOTA BHARU, BACHOK, PASIR PUTEH, TUMPAT , PASIR MAS, TANAH MERAH, MACHANG KUALA KRAI DAN GUA MUSANG (DAERAH CHIKU)",
  "ktn03": "JAJAHAN JELI, GUA MUSANG (DAERAH GALAS DAN BERTAM) DAN JAJAHAN KECIL LOJING",
  "sbh01": "BAHAGIAN SANDAKAN (TIMUR) BANDAR SANDAKAN, BUKIT GARAM, SEMAWANG, TEMANGGONG DAN TAMBISAN",
  "sbh02": "BAHAGIAN SANDAKAN (BARAT) PINANGAH, TERUSAN, BELURAN, KUAMUT DAN TELUPID",
  "sbh03": "BAHAGIAN TAWAU (TIMUR) LAHAD DATU, KUNAK, SILABUKAN, TUNGKU, SAHABAT, DAN SEMPORNA",
  "sbh04": "BAHAGIAN TAWAU (BARAT), BANDAR TAWAU, BALONG, MEROTAI DAN KALABAKAN",
  "sbh05": "BAHAGIAN KUDAT KUDAT, KOTA MARUDU, PITAS DAN PULAU BANGGI",
  "sbh06": "GUNUNG KINABALU",
  "sbh07": "BAHAGIAN PANTAI BARAT KOTA KINABALU, PENAMPANG, TUARAN, PAPAR, KOTA BELUD, PUTATAN DAN RANAU",
  "sbh08": "BAHAGIAN PEDALAMAN (ATAS) PENSIANGAN, KENINGAU, TAMBUNAN DAN NABAWAN",
  "sbh09": "BAHAGIAN PEDALAMAN (BAWAH) SIPITANG, MEMBAKUT, BEAUFORT, KUALA PENYU, WESTON, TENOM DAN LONG PA SIA",
  "swk01": "LIMBANG, SUNDAR, TRUSAN DAN LAWAS",
  "swk02": "NIAH, SIBUTI, MIRI, BEKENU DAN MARUDI",
  "swk03": "TATAU, SUAI, BELAGA, PANDAN, SEBAUH, BINTULU",
  "swk04": "IGAN, KANOWIT, SIBU, DALAT, OYA, BALINGIAN, MUKAH, KAPIT DAN SONG",
  "swk05": "BELAWAI, MATU, DARO, SARIKEI, JULAU, BINTANGOR DAN RAJANG",
  "swk06": "KABONG, LINGGA, SRI AMAN, ENGKELILI, BETONG, SPAOH, PUSA, SARATOK, ROBAN, DEBAK DAN LUBOK ANTU",
  "swk07": "SAMARAHAN, SIMUNJAN, SERIAN, SEBUYAU DAN MELUDAM",
  "swk08": "KUCHING, BAU, LUNDU DAN SEMATAN",
  "swk09": "KAMPUNG PATARIKAN",
  "wly01": "KUALA LUMPUR DAN PUTRAJAYA",
  "wly02": "LABUAN", };

export async function getTimes(search) {
  if (myCache.has(search)) {
    console.log("times cache used");
  } else {
    try {
      let response = await fetch(`https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=year&zone=${search}`);
      let data = await response.json();
      myCache.set(search, data.prayerTime, ttl);
      console.log("caching times");
    } catch (error) {
      console.log(error);
    }
    return myCache.get(search);
  }
}

export function timeCruncher(times) {
  let timeArray = [];
  timeArray.push(times);
  const timeFor1Week = timeArray[0].slice(numberDay, numberDay + 7);
  return timeFor1Week;
}

export function zoneDeterminer(zone) {
  let zoneName = "";
  zoneReplace[zone] ? (zoneName = zoneReplace[zone]) : (zoneName = zone);
  return zoneName;
}

export async function getTheQuran() {
  if (myCache.has('fullQuran')) {
    console.log("quran cache used");
  } else {
    try{
      const quranAyat = await fetch('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_id.json');
      myCache.set('fullQuran', quranAyat.json(), ttl);
      console.log('caching quran');
    } catch (error) {
      console.log(error);
    }
  }
  const quranAyat = await myCache.get('fullQuran');
  return quranAyat;
}

export async function giveTheQuran(surah) {
  surah++;
  if (myCache.has(`quranAudio-${surah}`)) {
    console.log("audio cache used");
  } else {
    try{
      const audio = await fetch(`https://api.quran.sutanlab.id/surah/${surah}`, {
        crossDomain:true,
        method: 'GET',
      });
      myCache.set(`quranAudio-${surah}`, audio.json(), ttl);
      console.log('caching audio');
    } catch (error) {
      console.log(error);
    }
  }  
  const audio = await myCache.get(`quranAudio-${surah}`);
  return audio.data.verses;
}

export async function giveQuranAudio(surah) {
  surah++;
  if (myCache.has(`quranAudio-${surah}`)) {
    console.log("audio cache used");
  } else {
    try{
      const audio = await fetch(`https://api.quran.sutanlab.id/surah/${surah}`, {
        crossDomain:true,
        method: 'GET',
      });
      myCache.set(`quranAudio-${surah}`, audio.json(), ttl);
      console.log('caching audio');
    } catch (error) {
      console.log(error);
    }
  }  
  const audio = await myCache.get(`quranAudio-${surah}`);
  return audio.data.verses;
}

export async function getTheKeetab() {
  if (myCache.has('keetab')) {
    console.log("keetab cache used");
  } else {
    try {
      const keetab = await fetch('https://api.hadith.sutanlab.id/books', {
        crossDomain:true,
        method: 'GET',
      });
      myCache.set('keetab', keetab.json(), ttl);
      console.log('caching keetab');
    } catch (error) {
      console.log(error);
    }
  }
  const keetab = await myCache.get('keetab');
  return keetab.data;
}

export async function giveTheKeetab(id) {
  if (myCache.has(`hadiths-${id}`)) {
    console.log("hadiths cache used");
  } else {
    try{
      const url = `https://api.hadith.sutanlab.id/books/${id}?range=1-5`;
      const hadiths = await fetch(url, {
        crossDomain:true,
        method: 'GET',
      });
      myCache.set(`hadiths-${id}`, hadiths.json(), ttl);
      console.log('caching hadiths');
    } catch (error) {
      console.log(error);
    }
  }
  const hadiths = await myCache.get(`hadiths-${id}`);
  return hadiths.data.hadiths;
}

export function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
      window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

  function goToNextPage() {
      setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
      setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
      const pageNumber = Number(event.target.textContent);
      setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  function showPaginateNav() {
    if (pages <= 1)
      return null;
    else if (pages > 1)
      return (
    <div className="grid">
        <div />
        <div className="pagination">
        {/* previous button */}
        <button 
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
            Sebelumnya
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
            <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
            <span>{item}</span>
            </button>
        ))}

        {/* next button */}
        <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
            Seterusnya
        </button>
        </div>
        <div />
        </div>
      );
  }

  return (
      <div>
      {/* show the ayats, 10 posts at a time */}
      <div className="dataContainer">
      {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
      ))}
      </div>
      <br /><br />
      {showPaginateNav()}
  </div>
  );
}