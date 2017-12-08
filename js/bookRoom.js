$(document).ready(function() {

  // API Reference from localStorage
  const localAPI = JSON.parse(localStorage.getItem("API"));

  const buildingID = localStorage ?
    localStorage.getItem('building_index') : new Error('Building not found!');

  const roomData = localStorage ?
    localStorage.getItem('room_name') : new Error('Room not found!');

  const roomIndex = localStorage ?
    localStorage.getItem('room_index') : new Error('Room idx not found!');

  $('#room_for_booking').html(roomData);

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

    const booking = {
      by: name,
      duration: duration,
      from: date,
      id: Math.round(Math.random() * 999999),
    }

    // push book to reservations
    localAPI.buildings[buildingID].rooms[roomIndex].reservations.push(booking);

    // overwrite localStorageAPI
    localStorage.setItem('API', JSON.stringify(localAPI));

    // redirect to homepage
    window.location.replace('./index.html');

  })

  // Bootstrap DatePicker
  $('#dateFrom').datetimepicker();
  $('#dateTo').datetimepicker();

})
