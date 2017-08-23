/*
  *********Raspiteam 2016******************

   OneWire ds18b20 temperature sensor.
  (Sensor de humedad con rango de 20 - 90% Relative Humidity y con precision de +-5% y 
  temperatura con rango de 0 - 50 *C con precision de +-2 grados.)
  
  Pin 1 (GND): To Arduino GND.
  Pin 2 (DATA): With a 4.7 k, 5k or 10k resistor pull-up to VDD . 
  Pin 3 (VDD): To Arduino 5V or 3.3V  and With a 4.7 k, 5k or 10k resistor pull-up to DATA.

*/


#include <OneWire.h>
#include <DallasTemperature.h>
//
const int ds18b20Pin = 4;   //pin D4 del Arduino Nano para el sensor de temperatura ds18b20

OneWire oneWire(ds18b20Pin);    //oneWire Library to work with ds18b20 DallasTemperature Library 
DallasTemperature ds18b20(&oneWire);  //ds18b20 DallasTemperature sensor Library
//  
//
void ds18b20_iniciar()
{
  ds18b20.begin();
  
}
//
float ds18b20_read()
{
  ds18b20.requestTemperatures();
  temperature = ds18b20.getTempCByIndex(0);
  //Serial.println(temperature);
  return temperature;
}

