const URL = 'https://api.myjson.com/bins/y3zb3';
const localAPI = JSON.parse(localStorage.getItem("API"));
const users = [];

const fillTable = (arr) => {
  arr.map((user, idx) => {
    let row =
      `<tr class="room_item">
        <th scope="row">${idx}</th>
        <td class="room_name">${user.name}</td>
        <td class="room_floor">${user.roomBooked}</td>
        <td class="room_reservations">${user.date}</td>
        <td class="room_reservations">${user.from}</td>
        <td class="room_reservations">${user.to}</td>
        <td class="room_reservations">${user.duration}</td>`

    $('#table_rows').append(row);
  });
}

const fetchLocalData = (data) => {
  data.buildings.filter(building => {
    building.rooms.filter(room => {
      if (room.reservations.length > 0){
        room.reservations.filter(reservation => {

          let toDate = new Date(reservation.from);
          toDate.setMinutes(toDate.getMinutes() + reservation.duration);

          users.push({
            name: reservation.by,
            roomBooked: room.name + ' ('+building.name+', '+building.city+')',
            date: moment(reservation.from).format('LL'),
            from: moment(reservation.from).format('LT'),
            to: moment(toDate).format('LT'),
            duration: reservation.duration
          });

        })// end reservations filter
      }
    })// end rooms filter
  })// end buildings filter
  fillTable(users);
}


const fetchData = () => {
  return fetch(URL)
    .then(res => res.json())
    .then(data => {
      data.buildings.filter(building => {
        building.rooms.filter(room => {
          if (room.reservations.length > 0){
            room.reservations.filter(reservation => {

              let toDate = new Date(reservation.from);
              toDate.setMinutes(toDate.getMinutes() + reservation.duration);

              users.push({
                name: reservation.by,
                roomBooked: room.name + ' ('+building.name+', '+building.city+')',
                date: moment(reservation.from).format('LL'),
                from: moment(reservation.from).format('LT'),
                to: moment(toDate).format('LT'),
                duration: reservation.duration
              });

            })// end reservations filter
          }
        })// end rooms filter
      })// end buildings filter
      fillTable(users);
    })
}

if(localStorage.API === null) {
  fetchData()
} else {
  fetchLocalData(localAPI);
}
