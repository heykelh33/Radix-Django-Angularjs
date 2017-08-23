  /*
  *********Raspiteam 2016******************
  Motion sensor HC-SR501
  Pin VCC to Arduino 5V
  Pin OUT to Arduino Pin D9
  Pin GND to Arduino GND
  */


//variable declaration
const int motionPin= 4; 

void hcsr501_iniciar()
{
  pinMode(motionPin, INPUT);
  
}

char* motion_read()
{
  motion = digitalRead(motionPin);
  
  if(motion == LOW)
  {
  return "NO MOTION";
  }
  else
  {
  return "MOTION";
  }
}

