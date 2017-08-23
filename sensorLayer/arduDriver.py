_author__ = 'cyberguille'

from multiprocessing import Queue, Process
from Queue import Empty

# libraries added to work with the xbee
import serial
import re


import Pyro4
from responseData import ResponseData
from dataJson import DataJson



class Worker(Process):
    """Threaded Worker"""

    #----------------------------------------------------------------------
    def __init__(self, queue):
        super(Worker,self).__init__()
        self.queue = queue
        # # to see if the arduino is connected
        self.ser = serial.Serial('/dev/ttyAMA0', 9600)
        text = '<!'
        print('Ardu %s' % text)
        #self.ser.write('%s\r' % text)
        #Rx =  self.ser.readline().strip()
        #variable = re.findall(r"(!)+", Rx)
        #print "Receiver %s and variable %s" %(Rx,variable)
        
        #if variable[0] == '!':
        #     print("Arduino connected")




    #----------------------------------------------------------------------
    def run(self):
        while True:
            try:
                # gets the tuple(idTimer,idSensor,cmd) from the queue
                requestData = self.queue.get()

                # process data
                self.process(requestData)

                # send a signal to the queue that the job is done
                #self.queue.task_done()
            except Empty:
                continue

    def process(self, requestData):
        print "Worker.process:"+ requestData.getCmd()
        self.ser.write('%s\r' % requestData.getCmd())
        #Rx = self.ser.readline().strip()
        #variable = re.findall(r"([A-Z])\w+", Rx)
        #value = re.findall(r"[\d']+", Rx)
        variable = 'T'
        value = 100
        responseData = ResponseData(requestData.getIdSensor(),variable,value,requestData.getTime())
        responseDataJson = responseData.asJson()
        sensorContainer = Pyro4.Proxy("PYRONAME:sensorContainer."+ requestData.getIdSensorContainer()+ ".setResult")
        sensorContainer.setResult(responseDataJson)

    def join(self, timeout=None):
       super(Worker, self).join(timeout)

class ArduDriver(object):

    def __init__(self,id):
        self.queue = Queue()
        self.id = id
        t = Worker(self.queue)
        t.start()
        proc = Process(target=self.damon, args=())
        proc.start()

    def enqueue(self, requestDataJson):
        print "ArduDriver.enqueue: " + requestDataJson
        requestData = DataJson.jsonToObj(requestDataJson)
        print requestData
        self.queue.put(requestData)

    def damon(self):
        daemon = Pyro4.Daemon()  # make a Pyro daemon
        ns = Pyro4.locateNS()  # find the name server
        uri = daemon.register(self)  # register the save maker as a Pyro object
        print "sensor."+self.id+".enqueue"
        ns.register("sensor."+self.id+".enqueue", uri)  # register the object with a name in the name server
        print("Ardu Ready.")
        daemon.requestLoop()  # start the event loop of the server to wait for calls


