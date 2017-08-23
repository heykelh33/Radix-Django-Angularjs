/*
  *********Raspiteam 2016******************
  photocell sensor
  Pin 1 to Arduino 3.3V
  Pin 2 to Arduino Pin A0 and GND through a 10k resistor
  
  */

//variable declaration
const int luxPin = A0;
double Vout;

//float mVolts


void photocell_iniciar()
{
  pinMode(luxPin, INPUT);
  
}


int lux_read()
{
  Vout = analogRead(luxPin)*0.0048828125;
  lux=(250/Vout -50);
  
  
  
  
  return lux;
  
  //mVolts = lux * resolucion_conversor;
  
  //Serial.println(mVolts, DEC);
}
