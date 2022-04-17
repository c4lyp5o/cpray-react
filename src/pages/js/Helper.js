import { useEffect, useState } from "react";
import NodeCache from "node-cache";
let myCache = new NodeCache();

const ttl = 15552000; // 6 months

export async function getTimes(search) {
  try {
    let response = await fetch(
      `https://api.waktusolat.me/waktusolat/week/${search}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getTheQuran() {
  if (myCache.has("fullQuran")) {
    console.log("quran cache used");
  } else {
    try {
      const quranAyat = await fetch(
        "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_id.json"
      );
      myCache.set("fullQuran", quranAyat.json(), ttl);
      console.log("caching quran");
    } catch (error) {
      console.log(error);
    }
  }
  const quranAyat = await myCache.get("fullQuran");
  return quranAyat;
}

export async function giveTheQuran(surah) {
  surah++;
  if (myCache.has(`quranAudio-${surah}`)) {
    console.log("audio cache used");
  } else {
    try {
      const audio = await fetch(
        `https://api.quran.sutanlab.id/surah/${surah}`,
        {
          crossDomain: true,
          method: "GET",
        }
      );
      myCache.set(`quranAudio-${surah}`, audio.json(), ttl);
      console.log("caching audio");
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
    try {
      const audio = await fetch(
        `https://api.quran.sutanlab.id/surah/${surah}`,
        {
          crossDomain: true,
          method: "GET",
        }
      );
      myCache.set(`quranAudio-${surah}`, audio.json(), ttl);
      console.log("caching audio");
    } catch (error) {
      console.log(error);
    }
  }
  const audio = await myCache.get(`quranAudio-${surah}`);
  return audio.data.verses;
}

export async function getTheKeetab() {
  if (myCache.has("keetab")) {
    console.log("keetab cache used");
  } else {
    try {
      const keetab = await fetch("https://api.hadith.sutanlab.id/books", {
        crossDomain: true,
        method: "GET",
      });
      myCache.set("keetab", keetab.json(), ttl);
      console.log("caching keetab");
    } catch (error) {
      console.log(error);
    }
  }
  const keetab = await myCache.get("keetab");
  return keetab.data;
}

export async function giveTheKeetab(id) {
  if (myCache.has(`hadiths-${id}`)) {
    console.log("hadiths cache used");
  } else {
    try {
      const url = `https://api.hadith.sutanlab.id/books/${id}?range=1-5`;
      const hadiths = await fetch(url, {
        crossDomain: true,
        method: "GET",
      });
      myCache.set(`hadiths-${id}`, hadiths.json(), ttl);
      console.log("caching hadiths");
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
    window.scrollTo({ behavior: "smooth", top: "0px" });
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
    if (pages <= 1) return null;
    else if (pages > 1)
      return (
        <div className="grid">
          <div />
          <div className="pagination">
            {/* previous button */}
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? "disabled" : ""}`}
            >
              Sebelumnya
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : null
                }`}
              >
                <span>{item}</span>
              </button>
            ))}

            {/* next button */}
            <button
              onClick={goToNextPage}
              className={`next ${currentPage === pages ? "disabled" : ""}`}
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
      <br />
      <br />
      {showPaginateNav()}
    </div>
  );
}
