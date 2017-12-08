const URL = 'https://api.myjson.com/bins/y3zb3';

//data.buildings[index].rooms[index].reservations

// Reservation
// let usersData = [
//   users: [
//     {
//       name: 'John Doe',
//       reservations: [
//         {
//           room: 'Room_name',
//           from: Date.time(),
//           to: Date.time()
//         }
//       ]
//     }
//   ]
// ];

const fetchData = () => {
  return fetch(URL)
    .then(res => res.json())
    .then(data => {
      let reservationsArr = [];

        data.buildings.find(building => {
          building.rooms.forEach(room => {
            reservationsArr.push(room.reservations)
          })
        })

      let filteredArray = reservationsArr.filter(reservation => reservation.length !== 0)
      let allReservations = [].concat.apply([], filteredArray);

      console.log(reservationsArr);
      console.log(JSON.stringify(allReservations))
    })
}

fetchData();
