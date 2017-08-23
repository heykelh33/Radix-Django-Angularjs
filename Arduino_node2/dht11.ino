/*
  *********Raspiteam 2016******************

   Humidity Sensor DHT11.
  (Sensor de humedad con rango de 20 - 90% Relative Humidity y con precision de +-5% y 
  temperatura con rango de 0 - 50 *C con precision de +-2 grados.)
  
  Pin 1 (VDD): To Arduino 5V or 3.3V.
  Pin 2 (DATA): With a 4.7 k, 5k or 10k resistor pull-up to VDD. 
  Pin 3 (---): Not connected.
  Pin 4 (GND): To Arduino GND.

*/

#include <DHT11.h>
const int dht11Pin = 5;     //pin D5 del Arduino Nano para el sensor de humedad/temperatura dht11
int dht11error;
DHT11 dht11(dht11Pin);          //DHT11 sensor Library;


float dht11_read()
{
if((dht11error = dht11.read(humidity, temperature)) == 0)    // Si devuelve 0 es que ha leido bien
            
            {
               //Serial.print(humidity);
               return humidity;
                           }
         else
            {
               return dht11error;
               
            }
}
