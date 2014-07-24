$(document).ready(function(){

  $('#check-in').click(curPos);
  $('#clear').click(clear);
  $('#positions').on('click', '.position-row', showMap);
  $('#positions').on('mouseleave', '.position-row', hideMap);
  fillPastPositions();
});

var curPos =  function(){
    navigator.geolocation.getCurrentPosition(function(position){
    var item = $('<tr>').addClass('position-row')
      .append($('<td>').text(position.coords.latitude))
      .append($('<td>').text(position.coords.longitude))
      .append($('<td>').text(position.coords.accuracy))
      .append($('<td>').text(new Date()));
    $('#positions').append(item);
    var pastPostions = localStorage.getItem('positions');
    localStorage.setItem('positions', item.prop('outerHTML') + pastPostions);
  });
};

var clear = function(){
    $('#positions .position-row').remove();
    localStorage.setItem('positions', '');
};

var fillPastPositions = function() {
  var pastPostions = localStorage.getItem('positions');
  $('#positions').append(pastPostions);
};

var showMap = function(){
  var lat = $(this.children[0]).text();
  var lon = $(this.children[1]).text();
  var earl = 'http://maps.googleapis.com/maps/api/staticmap?center='+ lat +',' + lon + '&amp&zoom=13&amp&size=300x300&amp&sensor=false';
  $(this).parent().append($('<td>').append($('<img src=' + earl +'>')));
};

var hideMap = function(){

};
