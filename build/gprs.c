#include <Wire.h>
#include <SPI.h>
#include <Adafruit_BMP280.h>
#include <SoftwareSerial.h>


#define BMP_SCK  (13)
#define BMP_MISO (12)
#define BMP_MOSI (11)
#define BMP_CS   (10)
#define rxPin 16   //GSM Module RX pin to ESP32 17 i.e TX2
#define txPin 17   //GSM Module TX pin to EXP32 16 i.e RX2


Adafruit_BMP280 bmp; 
SoftwareSerial SIM800(rxPin,txPin);

String get_temprature();
void init_gsm();
void gprs_connect();
boolean gprs_disconnect();
boolean is_gprs_connected();
void post_to_firebase(String data);
boolean waitResponse(String expected_answer="OK", unsigned int timeout=2000);

const String APN  = "airtelgprs.com";
const String USER = "";
const String PASS = "";

const String FIREBASE_HOST  = "https://esp32-45530-default-rtdb.asia-southeast1.firebasedatabase.app/";
const String FIREBASE_SECRET  = "AIzaSyDrSw4E_meg1eBAYVvRnXbCNZSJfQSjGOo";


#define USE_SSL true 
#define DELAY_MS 500
//Function: setup() start
void setup() {

  //Begin serial communication with Serial Monitor
  Serial.begin(115200);
  
  //status = bmp.begin(BMP280_ADDRESS_ALT, BMP280_CHIPID);
 unsigned status;
  //status = bmp.begin(BMP280_ADDRESS_ALT, BMP280_CHIPID);
  status = bmp.begin(0x76);
  if (!status) {
    Serial.println(F("Could not find a valid BMP280 sensor, check wiring or "
                      "try a different address!"));
    Serial.print("SensorID was: 0x"); Serial.println(bmp.sensorID(),16);
    Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
    Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
    Serial.print("        ID of 0x60 represents a BME 280.\n");
    Serial.print("        ID of 0x61 represents a BME 680.\n");
    while (1) delay(10);
  }
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
  //Begin serial communication with SIM800
  SIM800.begin(9600);
  Serial.println("Initializing SIM800...");
  init_gsm();
}

//Function: loop() start
void loop() {
  String data = get_temprature();
  Serial.println(data);
  if(!is_gprs_connected()){
    gprs_connect();
  }
  post_to_firebase(data);
  delay(1000);
}
//Function: get_temprature() start
String get_temprature()
{
  topFn:  
  String t = String(bmp.readTemperature(),2);
 String h = String(bmp.readPressure(), 2);
  // Check if any reads failed and exit early (to try again).
  if (t == "") {
    Serial.println(F("Failed to read from DHT sensor!"));
    goto topFn;
  }
 
 
  String Data = "{";
  
  Data += "\"temprature\":\"" + t + "\",";
  Data += "\"pressure \":\"" + h + "\"";
    
  Data += "}";

  return Data;
}


//Function: post_to_firebase() start
void post_to_sensor_cloud(String data)
{
  
 
  //Start HTTP connection
  SIM800.println("AT+HTTPINIT");
  waitResponse();
  delay(DELAY_MS);
  //Enabling SSL 1.0
  if(USE_SSL == true){
    SIM800.println("AT+HTTPSSL=1");
    waitResponse();
    delay(DELAY_MS);
  }
  //Setting up parameters for HTTP session
  SIM800.println("AT+HTTPPARA=\"CID\",1");
  waitResponse();
  delay(DELAY_MS);
  //Set the HTTP URL - Firebase URL and FIREBASE SECRET
  SIM800.println("AT+HTTPPARA=\"URL\","+FIREBASE_HOST+".json?auth="+FIREBASE_SECRET);
  waitResponse();
  delay(DELAY_MS);
  
  //Setting up re direct
  SIM800.println("AT+HTTPPARA=\"REDIR\",1");
  waitResponse();
  delay(DELAY_MS);

  //Setting up content type
  SIM800.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  waitResponse();
  delay(DELAY_MS);
  
  //Setting up Data Size
  //+HTTPACTION: 1,601,0 - error occurs if data length is not correct
  SIM800.println("AT+HTTPDATA=" + String(data.length()) + ",10000");
  waitResponse("DOWNLOAD");
  //Sending Data
  SIM800.println(data);
  waitResponse();
  delay(DELAY_MS);
  
  //Sending HTTP POST request
  SIM800.println("AT+HTTPACTION=1");
  
  for (uint32_t start = millis(); millis() - start < 20000;){
    while(!SIM800.available());
    String response = SIM800.readString();
    if(response.indexOf("+HTTPACTION:") > 0)
    {
      Serial.println(response);
      break;
    }
  }
    
  delay(DELAY_MS);
  
  //+HTTPACTION: 1,603,0 (POST to Firebase failed)
  //+HTTPACTION: 0,200,0 (POST to Firebase successfull)
  //Read the response
  SIM800.println("AT+HTTPREAD");
  waitResponse("OK");
  delay(DELAY_MS);
  
  //Stop HTTP connection
  SIM800.println("AT+HTTPTERM");
  waitResponse("OK",1000);
  delay(DELAY_MS);
  
}

// Initialize GSM Module
void init_gsm()
{
  
  //Testing AT Command
  SIM800.println("AT");
  waitResponse();
  delay(DELAY_MS);

  //Checks if the SIM is ready
  SIM800.println("AT+CPIN?");
  waitResponse("+CPIN: READY");
  delay(DELAY_MS);
  
  //Turning ON full functionality
  SIM800.println("AT+CFUN=1");
  waitResponse();
  delay(DELAY_MS);
  
  //Turn ON verbose error codes
  SIM800.println("AT+CMEE=2");
  waitResponse();
  delay(DELAY_MS);
  
  //Enable battery checks
  SIM800.println("AT+CBATCHK=1");
  waitResponse();
  delay(DELAY_MS);
  
  //Register Network (+CREG: 0,1 or +CREG: 0,5 for valid network)
  //+CREG: 0,1 or +CREG: 0,5 for valid network connection
  SIM800.println("AT+CREG?");
  waitResponse("+CREG: 0,");
  delay(DELAY_MS);
  
  //setting SMS text mode
  SIM800.print("AT+CMGF=1\r");
  waitResponse("OK");
  delay(DELAY_MS);
  
}
//Connect to the internet
void gprs_connect()
{
  //DISABLE GPRS
  SIM800.println("AT+SAPBR=0,1");
  waitResponse("OK",60000);
  delay(DELAY_MS);

  //Connecting to GPRS: GPRS - bearer profile 1
  SIM800.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  waitResponse();
  delay(DELAY_MS);
 
  //sets the APN settings for your sim card network provider.
  SIM800.println("AT+SAPBR=3,1,\"APN\","+APN);
  waitResponse();
  delay(DELAY_MS);
  
  //sets the user name settings for your sim card network provider.
  if(USER != ""){
    SIM800.println("AT+SAPBR=3,1,\"USER\","+USER);
    waitResponse();
    delay(DELAY_MS);
  }
  
  //sets the password settings for your sim card network provider.
  if(PASS != ""){
    SIM800.println("AT+SAPBR=3,1,\"PASS\","+PASS);
    waitResponse();
    delay(DELAY_MS);
  }
  //after executing the following command. the LED light of 
  //sim800l blinks very fast (twice a second) 
  //enable the GPRS: enable bearer 1
  SIM800.println("AT+SAPBR=1,1");
  waitResponse("OK", 30000);
  delay(DELAY_MS);
  //Get IP Address - Query the GPRS bearer context status
  SIM800.println("AT+SAPBR=2,1");
  waitResponse("OK");
  delay(DELAY_MS);
  
}


/*
* Function: gprs_disconnect()
* AT+CGATT = 1 modem is attached to GPRS to a network. 
* AT+CGATT = 0 modem is not attached to GPRS to a network
*/
boolean gprs_disconnect()
{
  
  //Disconnect GPRS
  SIM800.println("AT+CGATT=0");
  waitResponse("OK",60000);
  //delay(DELAY_MS);
  //DISABLE GPRS
  //SIM800.println("AT+SAPBR=0,1");
  //waitResponse("OK",60000);
  //delay(DELAY_MS);
  

  return true;
}
/*
* Function: gprs_disconnect()
* checks if the gprs connected.
* AT+CGATT = 1 modem is attached to GPRS to a network. 
* AT+CGATT = 0 modem is not attached to GPRS to a network
*/
boolean is_gprs_connected()
{
  SIM800.println("AT+CGATT?");
  if(waitResponse("+CGATT: 1",6000) == 1) { return false; }

  return true;
}
//Handling AT COMMANDS
//boolean waitResponse(String expected_answer="OK", unsigned int timeout=2000) //uncomment if syntax error (arduino)
boolean waitResponse(String expected_answer, unsigned int timeout) //uncomment if syntax error (esp8266)
{
  uint8_t x=0, answer=0;
  String response;
  unsigned long previous;
  //Clean the input buffer
  while( SIM800.available() > 0) SIM800.read();
  previous = millis();
  do{
    //if data in UART INPUT BUFFER, reads it
    if(SIM800.available() != 0){
        char c = SIM800.read();
        response.concat(c);
        x++;
        //checks if the (response == expected_answer)
        if(response.indexOf(expected_answer) > 0){
            answer = 1;
        }
    }
  }while((answer == 0) && ((millis() - previous) < timeout));
  
  Serial.println(response);
  return answer;
}


