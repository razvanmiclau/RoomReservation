// function fetchBuildings() {
//   return fetch('https://api.myjson.com/bins/y3zb3').then(res => res.json())
// }


  const URL = 'https://api.myjson.com/bins/y3zb3';

  const fetchRoom = (id) => {
    $.get(URL, function(data) {
      $('#table_rows').empty();
      data.buildings[id].rooms.map((room, idx) => {
        let row =
         `<tr class="room_item">
            <th scope="row">${idx}</th>
            <td class="room_name">${room.name}</td>
            <td class="room_floor">${room.floor}</td>
            <td class="room_reservations">${room.reservations.length}</td>
            <td class="room_reservations"><a href="book.html" class="btn btn-sm btn-primary">Book</a></td>
          </tr>`;
          $('#table_rows').append(row);
      })
    })
  }


    $.get(URL, function(data) {
      data.buildings.map((building, idx) => {
        let item =
          `<button onClick="fetchRoom(${idx})" class="dropdown-item">${building.name} - ${building.city}</button>`;
        $('.dropdown-menu').append(item);
      })
    });

$(document).ready(function() {
  // Booking Form Submission
  $('#bookingForm').submit((e) => {
    e.preventDefault();

    // booking name
    const name = e.target.username.value;

    // booking from/to
    const bookingFrom = Date.parse(e.target.from.value);
    const bookingTo = Date.parse(e.target.to.value);

    // booking duration
    const duration = bookingFrom - bookingTo;

    // booking date
    const date = new Date(bookingFrom).toISOString();

    //const bookingDuration = Date.parse(e.target.duration.value);

    const booking = {
      id: Math.round(Math.random() * 999999),
      by: name,
      date: date,
      duration: duration
    }
    console.log(booking);
  })

  // Bootstrap DatePicker
  $('#dateFrom').datetimepicker();
  $('#dateTo').datetimepicker();

})

// data.buildings[selectedBuilding].rooms.map((room,idx) => {
//   let row =
//    `<tr class="room_item">
//       <th scope="row">${idx}</th>
//       <td class="room_name">${room.name}</td>
//       <td class="room_city">${room.floor}</td>
//       <td class="room_city">${room.reservations.length}</td>
//     </tr>`;
//   $('#table_rows').append(row);
// })
