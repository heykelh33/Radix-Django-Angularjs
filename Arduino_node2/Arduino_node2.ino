/*
  *********Raspiteam 2016******************

  Firmware para experimentar con algunos sensores.

  Este se realiza en varias etapas:
  1- Lectura de los sensores y muestra de sus valores en unidades de ingenieria.
  2- Envio de esos valores mediante xBee a un Raspberry Pi.
*/
//#include <avr/interrupt.h>      //para usar interrupcion por timer
//#include <avr/io.h>             //para usar interrupcion por timer
#include <SoftwareSerial.h>


//variable declaration
#define led 13              //este led parpadea mientras todo esta funcionando OK
#define RXPIN 8             //pin D8 del Arduino Nano para Rx con el XBEE
#define TXPIN 7             //pin D7 del Arduino Nano para TX con el XBEE
SoftwareSerial XBeeSerial(RXPIN, TXPIN);

//unsigned int BAUDRATE = 9600; //baudrate para comunicacion serie con el Monitor Serie del Arduino IDE
#define BAUDRATE 9600   //baudrate para comunicacion serie UART y con el Monitor Serie del Arduino IDE

//volatile int state = LOW;
//volatile bool flag_read = false;

float humidity;
float temperature;

//#define TMR1 62499    //para 1seg.

//ISR(TIMER1_COMPA_vect) 
//{   
//  state = !state;
//  digitalWrite(led, state);
//
//  flag_read = true;
//}

///****************SETUP*****************//////////////////////
void setup(){
  pinMode(led, OUTPUT);
  ds18b20_iniciar();
  
  Serial.begin(BAUDRATE);
  XBeeSerial.begin(BAUDRATE); // XBee communication
  XBeeSerial.println("<s\n");
  Serial.println("setup ok");

  //*********TIMER SETUP*****************  
  //TIMER1 (16 bits) en modo CTC
//  TCCR1B |= (1 << CS12);  //seleccionando prescaler 0b100 (Tclk/256)
//  TCCR1B &= ~((1<<CS11) | (1<<CS10));    // turn off CS11 and CS10 bits
//  
//  TCCR1B |= (1 << WGM12); // Configure timer 1 for CTC mode
//  TCCR1A &= ~((1<<WGM11) | (1<<WGM10));   
//  OCR1A = TMR1;
//  
//  TIMSK1 |= (1 << OCIE1A); // Enable CTC interrupt 
//
//  sei();    //Enable global interrupts
  //*************END TIMER SETUP***********************************************

}
////**********END SETUP*****************////////////////////////

void loop()
{
  
  if (XBeeSerial.available()) 
  {
    serial_port();
  }
  
  if(buffer_complete())
  {    
    restart_buffer();
    guardar_bufferRx();
    analizar_Rx(getOption());    
  }
  
//  if(flag_read == true)
//  {
  
//    temperature= ds18b20_read();
//    humidity=dht11_read();
//    Serial.print(temperature); 
//    Serial.print(" grados celsius");
//    Serial.println(" ");
//    Serial.print(humidity);
//    Serial.println(" %");
//    Serial.println("----------- ");
    
    //flag_read = false;
  //}
 //delay(2000);
}

void analizar_Rx(char Rx)
{   
  signed long int linumber=0;
  linumber = getNumber();
  
  switch(Rx)
  {  
      case '!': verify_connection(); break; // to check connection
      case 'T': send_temperature(); break;
      case 'H': send_humidity(); break;  
      default: break;
  }
}
//
void verify_connection()
{
    Serial.println('!');
    XBeeSerial.print('!');
    XBeeSerial.print('\n');
}

void send_temperature()
{
   temperature = ds18b20_read();
    XBeeSerial.print('T');
    if(temperature){
        XBeeSerial.print(temperature);
        Serial.println(temperature);
        Serial.println("Temperature send");
    }
    else
        XBeeSerial.print('E'); 
    XBeeSerial.print('\n');
}

void send_humidity()
{
   humidity = dht11_read();
    XBeeSerial.print('H');
    if(humidity){
        XBeeSerial.print(humidity);
        Serial.println(humidity);
        Serial.println("Humidity send");
    }  
    else
        XBeeSerial.print('E'); 
    XBeeSerial.print('\n');
}
