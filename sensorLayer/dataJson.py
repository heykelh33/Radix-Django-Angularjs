__author__ = 'root'

import jsonpickle
class DataJson(object):
     def asJson(self):
        return jsonpickle.encode(self)
     @staticmethod
     def jsonToObj(obj):
         return jsonpickle.decode(obj)