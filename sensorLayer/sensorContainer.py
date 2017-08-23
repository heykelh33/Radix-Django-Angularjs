__author__ = 'cyberguille'

import Pyro4
from multiprocessing import Process
from datetime import datetime
from dataJson import DataJson
import threading
import time
import sched


class SensorContainer():

    def __init__(self, sensors, id, t):
        self.sensors = sensors
        self.id = id
        self.time = time
        proc = Process(target=self.damon, args=())
        proc.start()
        # procTimer =  Process(target=self.timer, args=(t,))
        # procTimer.start()
        self.s = sched.scheduler(time.time, time.sleep)
        self.timer(t)

        print 'end'


    def timer(self,interval):
        sc = sched.scheduler(time.time, time.sleep)
        sc.enter(1, 1, SensorContainer.do_something, (sc,interval,self.id,self.sensors,))
        sc.run()


    @staticmethod
    def do_something(sc,interval,id,sensors):
        dateTime = datetime.now()
        if(dateTime.second%interval==0):
            p = Process(target=SensorContainer.run,args=(id,sensors,dateTime))
            p.start()
        sc.enter(1, 1, SensorContainer.do_something, (sc,interval,id,sensors,))



    @staticmethod
    def run(id,sensors,datetime):
        for item in sensors:
            sensors[item].read(id,datetime.strftime('%Y-%m-%d %H:%M:%S.%f'))

    def setResult(self,responseDataJson):
        responseData = DataJson.jsonToObj(responseDataJson)
        # self.sensors[responseData.getIdSensor].receive(responseData)
        print("SensorConainer.setResult: "+responseData.getIdSensor())
        sensor = self.sensors[responseData.getIdSensor()]
        sensor.recive(responseData)

        
    def damon(self):
        daemon = Pyro4.Daemon()  # make a Pyro daemon
        ns = Pyro4.locateNS()  # find the name server
        uri = daemon.register(self)  # register the save maker as a Pyro object
        ns.register("sensorContainer."+ self.id+".setResult", uri)  # register the object with a name in the name server
        print("SensorContainer Ready.")
        daemon.requestLoop()  # start the event loop of the server to wait for calls
