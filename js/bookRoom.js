$(document).ready(function() {

  // API Reference from localStorage
  // ==========================================================================
  const localAPI = JSON.parse(localStorage.getItem("API"));

  const buildingID = localStorage ?
    localStorage.getItem('building_index') : new Error('Building not found!');

  const roomData = localStorage ?
    localStorage.getItem('room_name') : new Error('Room not found!');

  const roomIndex = localStorage ?
    localStorage.getItem('room_index') : new Error('Room idx not found!');

  const redirectTo = (path) => {
    window.location.replace(path);
  }

  $('#room_for_booking').html(roomData);

  // Booking Form Submission
  // ==========================================================================
  $('#bookingForm').submit((e) => {
    e.preventDefault();

    // booking name
    const name = e.target.username.value;

    // Booking Dates
    const bookingFromMilis = Date.parse(e.target.from.value);
    const from = new Date(e.target.from.value);
    const to = new Date(e.target.to.value);

    // Booking Duration
    const durationMilis = to.getTime() - from.getTime();
    const durationMins = (durationMilis / 60) / 1000;

    // booking date
    const date = new Date(bookingFromMilis).toISOString();

    const booking = {
      by: name,
      duration: durationMins,
      from: date,
      id: Math.round(Math.random() * 999999),
    }

    const checkRoom = () => {
      const fromMilis = from.getTime();
      const toMilis = fromMilis + durationMilis;

      // console.log('from : ' + new Date(fromMilis) + ' --> ' + fromMilis +' ms');
      // console.log('to : ' + new Date(toMilis) + ' --> ' + toMilis +' ms');

      let isBooked = false;

      localAPI.buildings[buildingID].rooms[roomIndex].reservations.forEach(reservation => {
        // console.log('compareFrom : ' + new Date(reservation.from) + ' --> ' + new Date(reservation.from).getTime() +' ms');
        // console.log('compareTo: ' + new Date(compareTo) + ' --> ' + new Date(compareTo).getTime() +' ms');
        let compareTo = new Date(reservation.from).getTime() + (reservation.duration * 60) * 1000;
        if (fromMilis < new Date(compareTo).getTime() && toMilis > new Date(reservation.from).getTime()) {
          isBooked = true;
        }
      })
      return isBooked;
    }

    //console.log(checkRoom());

    const bookRoom = () => {
      if(!checkRoom()) {
        localAPI.buildings[buildingID].rooms[roomIndex].reservations.push(booking);
        localStorage.setItem('API', JSON.stringify(localAPI));
        redirectTo('./index.html');
      } else {
        alert('This room is already booked! Please select a different time slot');
      }
    }

    bookRoom();
  })

  // Bootstrap DatePicker
  $('#dateFrom').datetimepicker();
  $('#dateTo').datetimepicker();

})
