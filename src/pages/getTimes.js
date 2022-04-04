// const [display, setDisplay] = useState(false);


// export function displayTimes(times) {
//     if (display) {
//       return (
//         <><p>Waktu solat untuk {zone}</p><table>
//           <thead>
//             <tr>
//               <th>Tarikh</th>
//               <td>Subuh</td>
//               <td>Zuhur</td>
//               <td>Asar</td>
//               <td>Maghrib</td>
//               <td>Isha'</td>
//             </tr>
//           </thead>
//           <tbody>
//             {times.map((time, index) => (
//               <tr key={index}>
//                 <td>{time.date}</td>
//                 <td>{time.fajr}</td>
//                 <td>{time.dhuhr}</td>
//                 <td>{time.asr}</td>
//                 <td>{time.maghrib}</td>
//                 <td>{time.isha}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table></>
//       );
//     }
//   }

export async function getTimes(search) {
  try {
    console.log(search);
    let response = await fetch(`https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=week&zone=${search}`);
    let data = await response.json();
    return data.prayerTime;
  } catch (error) {
    console.log(error);
  }
}
