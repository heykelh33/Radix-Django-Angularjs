/*
	*********Raspiteam 2016******************

	Firmware para experimentar con algunos sensores.

	Este se realiza en varias etapas:
	1- Lectura de los sensores y muestra de sus valores en unidades de ingenieria.
	2- Envio de esos valores mediante xBee a un Raspberry Pi.
*/


#include <avr/interrupt.h>      //para usar interrupcion por timer
#include <avr/io.h>             //para usar interrupcion por timer

#include <Wire.h>             //para usar puerto I2C
#include <SoftwareSerial.h>   //para usar puerto UART

//variable declaration
#define led 13              //este led parpadea mientras todo esta funcionando OK
#define RXPIN 8             //pin D8 del Arduino Nano para Rx con el XBEE
#define TXPIN 7             //pin D7 del Arduino Nano para TX con el XBEE

SoftwareSerial XBeeSerial(RXPIN, TXPIN);  //

//unsigned int BAUDRATE = 9600; 
#define BAUDRATE 9600   //baudrate para comunicacion serie UART y con el Monitor Serie del Arduino IDE

volatile int state = LOW;
volatile bool flag_read = false;


int lux;
char* motionstr;
int motion;

//variables del sensor GY-65
short temperature;
long pressure;

#define TMR1 62499    //para 1seg.

ISR(TIMER1_COMPA_vect) 
{   
  state = !state;
  digitalWrite(led, state);

  //flag_read = true;
}

///****************SETUP*****************//////////////////////
 void setup() {
  pinMode(led, OUTPUT); 
  photocell_iniciar();
  hcsr501_iniciar();
  
  Wire.begin();
  bmp085Calibration();
  
  Serial.begin(BAUDRATE); 
  XBeeSerial.begin(BAUDRATE); // XBee communication
  XBeeSerial.println("<s\n");
  Serial.println("setup ok");

  //*********TIMER SETUP*****************  
  //TIMER1 (16 bits) en modo CTC
  TCCR1B |= (1 << CS12);  //seleccionando prescaler 0b100 (Tclk/256)
  TCCR1B &= ~((1<<CS11) | (1<<CS10));    // turn off CS11 and CS10 bits
  
  TCCR1B |= (1 << WGM12); // Configure timer 1 for CTC mode
  TCCR1A &= ~((1<<WGM11) | (1<<WGM10));   
  OCR1A = TMR1;
  
  TIMSK1 |= (1 << OCIE1A); // Enable CTC interrupt 

  sei();    //Enable global interrupts
  //*************END TIMER SETUP***********************************************
}
////**********END SETUP*****************////////////////////////


////////*********LOOP********////////////////////////////////////
void loop() 
{
  
  if (XBeeSerial.available()) 
  {
    serial_port();
    Serial.println("XBeeSerial available");
  }
   
  if(buffer_complete())
  {    
    restart_buffer();
    guardar_bufferRx();
    analizar_Rx(getOption());    
  }

//  if(flag_read == true)
//  {
//    pressure= bmp085GetPressure(bmp085ReadUP());
//    temperature= bmp085GetTemperature(bmp085ReadUT());
//    lux=lux_read();
//    motionstr=motion_read();
//    Serial.print(pressure);
//    //Serial.print("Pa");
//    Serial.println(" ");
//    Serial.print(temperature);
//    //Serial.print(" grados celsius");
//    Serial.println(" ");
//    Serial.print(lux, DEC);
//    //Serial.print("lux");
//    Serial.println(" ");
//    Serial.println(motionstr);
//  
//    flag_read = false;
//  }
  //delay(2000);
}
/////*****END LOOP***////////////////////////////////

void analizar_Rx(char Rx)
{   
  signed long int linumber=0;
  linumber = getNumber();
  
  switch(Rx)
  {  
      case '!': verify_connection(); break; // to check connection
      case 'T': send_temperature(); break;
      case 'P': send_pressure(); break;  
      case 'L': send_lux(); break;  
      case 'M': send_motion(); break;  
      default: break;
  }
}

void verify_connection()
{
    Serial.println('!');
    XBeeSerial.print('!');
    XBeeSerial.print('\n');
}

void send_temperature()
{
    temperature = bmp085GetTemperature(bmp085ReadUT());
    XBeeSerial.print('T');
    if(temperature)
        XBeeSerial.print(temperature);  
    else
        XBeeSerial.print('E'); 
    XBeeSerial.print('\n');
}

void send_pressure()
{
    pressure = bmp085GetPressure(bmp085ReadUP());
    XBeeSerial.print('P');
    if(pressure)
        XBeeSerial.print(pressure); 
    else
        XBeeSerial.print('E'); 
    XBeeSerial.print('\n');
}

void send_lux()
{
    lux = lux_read(); ;
    XBeeSerial.print('L');
    if(lux)
        XBeeSerial.print(lux); 
    else
        XBeeSerial.print('E'); 
    XBeeSerial.print('\n');
}

void send_motion()
{
    motion = motion_read();
    XBeeSerial.print('M');
    if(motion == LOW)
        XBeeSerial.print('0');
    else
        XBeeSerial.print('1');
    XBeeSerial.print('\n');
}
