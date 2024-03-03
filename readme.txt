http works on req res model , in a website
you have to req the server to get a response.
http is a protocol
Disadvantage 
It is not a persistent connected with the server , in real based application if i make changes in to do in mobile it should also get reflected in website 

There are two ways to solve 
server side events -
in http request there is a header that enables server side event 
Use long polling - send http request in an repeated interval

There is how websocket comes into play
it is a protocol that is persiistently connected with client side and backend ,

it covers server side events, to make real time application use web socket 

client gives a http request    server     takes it  and upgrades it to websocket protcol ,  

Application :- Chat

How can i implement web sockets

by using socket.io it is a abstraction over websocket it easily create room

"room" typically refers to a logical grouping of clients (or sockets) within the server-side application. 

For this socket.io need to be in client side as well as in server side 
think of socket.io as a icecream scoop over server that will stay forever until you exit it 
It is not that much used as web socket is tried and tested model and socket.io needs to be present in the client side but websocketis present alawys
