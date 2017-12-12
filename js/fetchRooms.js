const URL = 'https://api.myjson.com/bins/y3zb3';

const displayBuildings = (data) => {
  data.buildings.map((building, idx) => {
    let item =
      `<li><a onClick="fetchRoom(${idx})">${building.name} - ${building.city}</a></li>`;
    $('.dropdown-menu').append(item);
  })
};

// Add selected room to localStorage
const saveData = (key, name, index) => {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(name));
    if (index !== undefined) {
      localStorage.setItem('room_index', index);
    }
  }
};

$.get(URL, function(data) {
  if (localStorage.getItem('API') === null) {
      saveData('API', data);
  }
}).then(displayBuildings(JSON.parse(localStorage.getItem('API'))));

const fillTable = (arr) => {
  arr.map((room, idx) => {
    let row =
      `<tr class="room_item">
        <th scope="row">${idx}</th>
        <td class="room_name">${room.name}</td>
        <td class="room_floor">${room.floor}</td>
        <td class="room_reservations">${room.reservations.length}</td>
        <td class="room_booking"><a onclick="saveData('room_name','${room.name}', ${idx})" href="book.html" id="btn-book" class="btn btn-sm btn-primary">Book</a></td>
      </tr>`;
    $('#table_rows').append(row);
  });
};

const fetchRoom = (id) => {
  // clear table
  $('#table_rows').empty();

  // get rooms from localStorage.
  const rooms = JSON.parse(localStorage.getItem('API')).buildings[id].rooms;

  // populate the table with rooms.
  fillTable(rooms);

  // save selected building index to localStorage.
  saveData('building_index', id);
};
