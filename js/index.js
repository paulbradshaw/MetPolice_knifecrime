var baseurl = 'https://api.spotify.com/v1/artists/'

var querywspaces = '4Z8W4fKeB5YxbusRsdQVPb'+'/top-tracks?country=gb'
var query = querywspaces.replace(/ /g,'+') //there's no spaces but just in case
console.log(query)
var url = baseurl+query
// e.g. https://api.spotify.com/v1/tracks/6b2oQwSGFkzsMtQruIWm2p

//We use getJSON to avoid blocking
jQuery.getJSON(url, function(response){
  console.log(response.tracks[0,10]);
  console.log(response.total_count);
  // This is defined as a variable in order to sort it
  //see https://datatables.net/reference/api/column().order()#Example
var spotifytable = $('#spotify').DataTable({
  'data' : response.tracks, //because it's an array we need to drill further into it
  'columns' : [
    { 'data' : 'popularity'},
    { 'data' : 'name'},
    { 'data' : 'explicit'},
    { 'data' : 'album.name'},
    { 'data' : 'album.artists[0].name'}
    // { 'data' : 'album.images[0].url'}
  ]
});
  spotifytable
    .column( '0:visible' )
    .order( 'desc' )
    .draw();
});