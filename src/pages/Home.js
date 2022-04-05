import { useState } from "react";
import { getTimes, timeCruncher, zoneDeterminer } from "./getTimes";

function Home() {

  const [search, setSearch] = useState("");
  const [times, setTimes] = useState([]);
  const [zone, setZone] = useState("");
  const [display, setDisplay] = useState(false);
  const [intro, setIntro] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    await getTimes(search).then(data => {
      setZone(zoneDeterminer(search));
      setDisplay(true);
      setIntro(false);
      setTimes(timeCruncher(data));     
    });
  }

  function TheIntro() {
    if (intro === true) {
      return (
        <p1>Assalamualaikum</p1>
      );
    }
  }

  function displayTimes(times) {
    if (display) {
      return (
        <>
          <div class='zoneName'>
            <h1>{zone}</h1>
          </div>
        <table>
          <thead>
            <tr>
              <th>Tarikh</th>
              <td>Subuh</td>
              <td>Zuhur</td>
              <td>Asar</td>
              <td>Maghrib</td>
              <td>Isha'</td>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => {
              return (
                <tr key={index}>
                  <td>{time.date}</td>
                  <td>{time.fajr}</td>
                  <td>{time.dhuhr}</td>
                  <td>{time.asr}</td>
                  <td>{time.maghrib}</td>
                  <td>{time.isha}</td>
                </tr>
              );
            })}
          </tbody>
        </table></>
      );
    }
  }

  return (
    <main className="container">
      <div class="grid">
        <div>
          <form onSubmit={handleSubmit}>
            <select onChange={(e) => setSearch(e.target.value)} id="zone" required="" name="zone">
              <option value="">Sila pilih zon...</option>
              <optgroup label="Kedah">
                <option value="kdh01">KOTA SETAR, POKOK SENA DAN KUBANG PASU</option>
                <option value="kdh02">KUALA MUDA, PENDANG DAN YAN</option>
                <option value="kdh03">PADANG TERAP DAN SIK</option>
                <option value="kdh04">BALING</option>
                <option value="kdh05">KULIM DAN BANDAR BAHARU</option>
                <option value="kdh06">LANGKAWI</option>
                <option value="kdh07">GUNUNG JERAI</option>
              </optgroup>
              <optgroup label="Kelantan">
                <option value="ktn01">JAJAHAN KOTA BHARU, BACHOK, PASIR PUTEH, TUMPAT , PASIR MAS, TANAH MERAH, MACHANG KUALA KRAI DAN GUA MUSANG (DAERAH CHIKU)</option>
                <option value="ktn03">JAJAHAN JELI, GUA MUSANG (DAERAH GALAS DAN BERTAM) DAN JAJAHAN KECIL LOJING</option>
              </optgroup>
              <optgroup label="Johor">
                <option value="jhr01">PULAU AUR DAN PULAU PEMANGGIL</option>
                <option value="jhr02">KOTA TINGGI, MERSING DAN JOHOR BAHRU</option>
                <option value="jhr03">KLUANG DAN PONTIAN</option>
                <option value="jhr04">BATU PAHAT, MUAR, SEGAMAT DAN GEMAS JOHOR</option>
              </optgroup>
              <optgroup label="Melaka">
                <option value="mlk01">Seluruh Negeri Melaka</option>
              </optgroup>
              <optgroup label="Negeri Sembilan">
                <option value="ngs01">JEMPOL DAN TAMPIN</option>
                <option value="ngs01">PORT DICKSON, SEREMBAN, KUALA PILAH, JELEBU DAN REMBAU</option>
              </optgroup>
              <optgroup label="Pahang">
                <option value="phg01">PULAU TIOMAN</option>
                <option value="phg02">ROMPIN, PEKAN, MUADZAM SHAH DAN KUANTAN</option>
                <option value="phg03">MARAN, CHENOR, TEMERLOH, BERA, JENGKA DAN JERANTUT</option>
                <option value="phg04">BENTONG, RAUB DAN LIPIS</option>
                <option value="phg05">BUKIT TINGGI, GENTING SEMPAH, DAN JANDA BAIK</option>
                <option value="phg06">CAMERON HIGHLANDS, BUKIT FRASER DAN GENTING HIGHLANDS</option>
              </optgroup>
              <optgroup label="Perak">
                <option value="prk01">TAPAH, SLIM RIVER DAN TANJUNG MALIM</option>
                <option value="prk02">IPOH, BATU GAJAH, KAMPAR, SG. SIPUT DAN KUALA KANGSAR</option>
                <option value="prk03">PENGKALAN HULU, GERIK DAN LENGGONG</option>
                <option value="prk04">TEMENGOR DAN BELUM</option>
                <option value="prk05">TELUK INTAN, BAGAN DATUK, KG. GAJAH, SERI ISKANDAR, BERUAS, PARIT, LUMUT, SITIAWAN DAN PULAU PANGKOR</option>
                <option value="prk06">SELAMA, TAIPING, BAGAN SERAI DAN PARIT BUNTAR</option>
                <option value="prk07">BUKIT LARUT</option>
              </optgroup>
              <optgroup label="Perlis">
                <option value="pls01">Seluruh negeri Perlis</option>
              </optgroup>
              <optgroup label="Pulau Pinang">
                <option value="png01">Seluruh negeri Pulau Pinang</option>
              </optgroup>
              <optgroup label="Sabah">
                <option value="sbh01">BAHAGIAN SANDAKAN (TIMUR) BANDAR SANDAKAN, BUKIT GARAM, SEMAWANG, TEMANGGONG DAN TAMBISAN</option>
                <option value="sbh02">BAHAGIAN SANDAKAN (BARAT) PINANGAH, TERUSAN, BELURAN, KUAMUT DAN TELUPID</option>
                <option value="sbh03">BAHAGIAN TAWAU (TIMUR) LAHAD DATU, KUNAK, SILABUKAN, TUNGKU, SAHABAT, DAN SEMPORNA</option>
                <option value="sbh04">BAHAGIAN TAWAU (BARAT), BANDAR TAWAU, BALONG, MEROTAI DAN KALABAKAN</option>
                <option value="sbh05">BAHAGIAN KUDAT KUDAT, KOTA MARUDU, PITAS DAN PULAU BANGGI</option>
                <option value="sbh06">GUNUNG KINABALU</option>
                <option value="sbh07">BAHAGIAN PANTAI BARAT KOTA KINABALU, PENAMPANG, TUARAN, PAPAR, KOTA BELUD, PUTATAN DAN RANAU</option>
                <option value="sbh08">BAHAGIAN PEDALAMAN (ATAS) PENSIANGAN, KENINGAU, TAMBUNAN DAN NABAWAN</option>
                <option value="sbh09">BAHAGIAN PEDALAMAN (BAWAH) SIPITANG, MEMBAKUT, BEAUFORT, KUALA PENYU, WESTON, TENOM DAN LONG PA SIA</option>
              </optgroup>
              <optgroup label="Sarawak">
                <option value="swk01">LIMBANG, SUNDAR, TRUSAN DAN LAWAS</option>
                <option value="swk02">NIAH, SIBUTI, MIRI, BEKENU DAN MARUDI</option>
                <option value="swk03">TATAU, SUAI, BELAGA, PANDAN, SEBAUH, BINTULU</option>
                <option value="swk04">IGAN, KANOWIT, SIBU, DALAT, OYA, BALINGIAN, MUKAH, KAPIT DAN SONG</option>
                <option value="swk05">BELAWAI, MATU, DARO, SARIKEI, JULAU, BINTANGOR DAN RAJANG</option>
                <option value="swk06">KABONG, LINGGA, SRI AMAN, ENGKELILI, BETONG, SPAOH, PUSA, SARATOK, ROBAN, DEBAK DAN LUBOK ANTU</option>
                <option value="swk07">SAMARAHAN, SIMUNJAN, SERIAN, SEBUYAU DAN MELUDAM</option>
                <option value="swk08">KUCHING, BAU, LUNDU DAN SEMATAN</option>
                <option value="swk09">KAMPUNG PATARIKAN</option>
              </optgroup>
              <optgroup label="Selangor">
                <option value="sgr01">HULU SELANGOR, GOMBAK, PETALING/SHAH ALAM, HULU LANGAT DAN SEPANG</option>
                <option value="sgr02">SABAK BERNAM DAN KUALA SELANGOR</option>
                <option value="sgr03">KLANG DAN KUALA LANGAT</option>
              </optgroup>
              <optgroup label="Terengganu">
                <option value="trg01">KUALA TERENGGANU, MARANG DAN KUALA NERUS</option>
                <option value="trg02">BESUT DAN SETIU</option>
                <option value="trg03">HULU TERENGGANU</option>
                <option value="trg04">DUNGUN DAN KEMAMAN</option>
              </optgroup>
              <optgroup label="Wilayah Persekutuan">
                <option value="wly01">Kuala Lumpur dan Putrajaya</option>
                <option value="wly02">Labuan</option>
              </optgroup>
            </select><br />
            <button type="submit" value="Submit">Pilih</button>
          </form>
        </div>
        <div></div>
        <div></div>
        <div>
          <h1>Waktu Solat</h1>
        </div>
      </div>
      <p>{TheIntro()}</p>
      {displayTimes(times)}
    </main>
  );
}

export default Home;