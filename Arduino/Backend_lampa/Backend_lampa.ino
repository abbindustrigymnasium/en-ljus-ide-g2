#include <ESP8266WiFi.h>
//Både ArduinoJson och Wifimanager har installerats som bibliotek, ArduinoJSon har version 5.13 och inte den senaste.
#include <ArduinoJson.h> // V5.13 inte 6! https://arduinojson.org/?utm_source=meta&utm_medium=library.properties
//needed for library
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager
#define D8 14 //Cold
#define D7 13 //Warm
int ColdValue = 0;
int WarmValue = 0;

void setup() {
      pinMode(14, OUTPUT); //Bestämmer att GPIO13 är output.
      pinMode(13, OUTPUT);
 
    Serial.begin(115200);
  //Från Wifimanagers hemsida.
    //WiFiManager
    //Local intialization. Once its business is done, there is no need to keep it around.
    WiFiManager wifiManager;
    //reset saved settings
    //wifiManager.resetSettings();
    
    //Set custom ip for portal
    //WifiManager.setAPStaticIPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));

    //Fetches ssid and pass from eeprom and tries to connect.
    //If it does not connect it starts an access point with the specified name.
    //Here  "AutoConnectAP"
    //And goes into a blocking loop awaiting configuration.
    wifiManager.autoConnect("Connecttor");
    //or use this for auto generated name ESP + ChipID
    //wifiManager.autoConnect();

    Serial.println("connected...yeey :)"); //Den här kommentaren säger att man är ansulten.
}

 String lightName= "lightName"; //Lampans namn
 int StrWarm = 0;
 int StrCold = 0;//Ljusstyrkan
 bool LampExist=false; //Finns lampan redan eller är den ny? Den är ny.
 bool GottenValues = false; //Har vi hämtat några värden redan från databasen? Nej

String GetfromDB(String host){
String url= "/ljuside2/"; //URL:en som vi använder för att skicka värden.
  //Detta skickar värdena till servern.
   String Output ="GET"+ url + " HTTP/1.1\r\n" + //Säger att det är typen post. Det kan också vara patch, get, delete beroende på vad man vill göra, samt url:en vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till.
                 "\r\nConnection: close\r\n\r\n"; //Skickar vår buffer som  body.
 return Output;
}

String SendtoDB(String host){
  String type ="POST ";
  if(GottenValues==true)
  {
  String url= "/light/"; //URL:en som vi använder för att skicka värden.
  
  StaticJsonBuffer<300> jsonBuffer; //Skapar en buffer, det vill säga så mycket minne som vårt blivande jsonobjekt får använda.
  JsonObject& root = jsonBuffer.createObject(); //Skapar ett jsonobjekt som vi kallar root.
  root["lightName"] = lightName; //Skapar parameterna name och ger den värdet vykort.
  root["StrWarm"] = StrWarm;
  root["StrCold"] = StrCold;//Samma som ovan.
  String buffer;  //Skapar en string som vi kallar buffer.
  root.printTo(buffer); //Lägger över och konverterar vårt jsonobjekt till en string och sparar det i buffer-variabeln.
  if(LampExist==true)
  {
  type ="PATCH ";
      Serial.println("Uppdaterar värdet!"); ////Om lampan är tänd ska ljusstyrkan och värmen kunna uppdateras.
  }
//Här någonstans ska vi anvädna POST eller PATCH beroende på om värdet finns!!!!
  //Detta skickar värdena till servern.
   String Output =type+url + " HTTP/1.1\r\n" + //Säger att det är typen post. Det kan också vara patch, get, delete beroende på vad man vill göra, samt url:en vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till.
                 "Content-Type: application/json\r\n" + //Säger att det är Json-format vi skickar (dock konverterat till en string för att kunna skickas.
                 "Content-Length: " + buffer.length() + "\r\n" + //Berättar hur stort packet aom vi ska skicka är.
                 "\r\n" + //Detta är en extra radbrytning för att berätta att det är här bodyn startar.
                 buffer + "\n"; //Skickar vår buffer som  body.
 
 return Output;
  }
  else
  return "";
}

void ConnecttoDB(String input){

   const int httpPort = 3001; //Porten vi ska till.
   const char* host = "iot.abbindustrigymnasium.se";//Adressen vi ska ansluta till. 7Laddaremygglustbil "http://iot.abbindustrigymnasium.se"
    
     Serial.print("connecting to "); //Säger att anslutningen pågår.
 Serial.println(host); //Skriver ut i terminalen för att veta vart vi ska skicka värdena.
  
  // Use WiFiClient class to create TCP connections.
  WiFiClient client;
  if (!client.connect(host, httpPort)) { //Försöker ansluta.
    Serial.println("connection failed"); //Säger att anslutningen misslyckades.
    return;
  }
  else  //Om vi kan ansluta så ska lampa lysa.
  {
    //digitalWrite(13, HIGH);
    }
if(input =="GET")
client.print(GetfromDB(host));
else
client.print(SendtoDB(host));

  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 10000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }
  
  String json = ""; //De delarna vi vill ha ut av meddelandet sparar vi i stringen json.
  boolean httpBody = false; //bool för att säga att vi har kommit ner till bodydelen.
  //Tittar om vi har anslutit till clienten.
  while (client.available()) {
  String line = client.readStringUntil('\r'); //Läser varje rad tills det är slut på rader.
  if (!httpBody && line.charAt(1) == '{') { //Om vi hittar { så vet vi att vi har nått bodyn.
    httpBody = true; //boolen blir sann för att vi ska veta för nästa rad att vi redan är i bodyn.
  }
  if (httpBody) {
    json += line; //Om bodyn är sann lägg till raden i json-variabeln.
  }
}
//Skriver bodyns data.
    Serial.println("Got data:");
    Serial.println(json);
  if(input =="GET")
    UpdateValues(json); //Om det är Get så uppdateras värdena.

  Serial.println();
  Serial.println("closing connection"); //Avsluar anslutningen.
}

void UpdateValues(String json){
      //Vi skapar ett Json-objekt där vi klistrar in värdena från bodyn.
      StaticJsonBuffer<400> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(json);
    //Vi skapar sedan lokala strings där vi lägger över värdena en i taget.
    String dataL = root["lightName"];
         if(dataL!="none")
         {
    int dataC = root["StrCold"];
    int dataW = root["StrWarm"];
    //Därefter skriver vi över de lokala värdena till våra globala värden för lampan.
     StrCold = dataC;
     StrWarm = dataW;

     LampExist=true;
     Serial.print(StrCold);
     Serial.print(StrWarm);//Om lampan är tänd ska man kunna se ljusstyrkan.
         }
         else
         {
          String Mess =root["message"];
         Serial.print(Mess);
         }
  GottenValues = true;
}

void UpdatingLamp(){
  WarmValue = analogRead(StrWarm);
  if(StrWarm > 50 || StrCold > 50){
  analogWrite(14, WarmValue);
  digitalWrite(12, HIGH);
  }
else
  {
  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  }
}

void loop() {
 ConnecttoDB("GET"); 
  UpdatingLamp();
  Serial.print(lightName);
  Serial.print(StrWarm);
  Serial.print(StrCold);
  delay(50); //Lampan uppdateras var tionde sekund.
 // ConnecttoDB("POST");
 //delay(10000);
}
   //analog write, 0 -1023


  // digitalWrite(13, LOW);
