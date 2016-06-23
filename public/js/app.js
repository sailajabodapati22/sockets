var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

socket.on('message', function (message) {
	var messageTimestamp = moment.utc(message.timestamp).local();
	console.log('New message:');
	console.log(message.text);
	jQuery('.messages').append("<p><strong>"+ messageTimestamp.format('h:mm a')+"</strong>" + message.text + "</p>");
});

var $form = jQuery('#message-form');
$form.on('submit', function(event) {
	event.preventDefault();
	$message = $form.find('input[name=message]');
	socket.emit('message',{ text: $message.val()});
	$message.val('');
});
