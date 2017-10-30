from channels.routing import route
from radix.consumers import ws_connect, ws_disconnect,ws_message

channel_routing = [
   # Wire up websocket channels to our consumers:
   route("websocket.connect", ws_connect),
   route("websocket.disconnect", ws_disconnect),
   route('websocket.receive', ws_message),
]
