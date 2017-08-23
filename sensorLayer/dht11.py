__author__ = 'guille'

from sensorABC import Sensor
import random

class Dht11(Sensor):

    def __init__(self, nombre, variable, tipo, gpiopin):
		super(Dht11, self).__init__(nombre, variable, tipo, gpiopin)

    def read(self):
        humedad = round(random.uniform(0, 100), 2)
        return humedad