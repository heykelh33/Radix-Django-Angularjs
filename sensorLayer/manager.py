__author__ = 'cyberguille'

from saveServer import SaveServer
from arduDriver import ArduDriver
from gy65_temp import Gy65_temp
from sensorContainer import SensorContainer

saveSarver = SaveServer()
arduDriver1 = ArduDriver("ardu1")
#arduDriver2 = ArduDriver("ardu2")
gy65_temp1 = Gy65_temp("Gy65_temp1", "Temperatura", "1", 1,"ardu1")
#gy65_temp2 = Gy65_temp("Gy65_temp2", "Temperatura", "1", 1,"ardu2")
s = SensorContainer({gy65_temp1.id: gy65_temp1}, "SensorContainer1",5.0)
