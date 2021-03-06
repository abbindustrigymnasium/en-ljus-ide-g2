
██╗      █████╗ ███╗   ███╗██████╗      ██████╗ ██████╗ ██╗   ██╗██████╗ ██████╗     ██████╗ 
██║     ██╔══██╗████╗ ████║██╔══██╗    ██╔════╝ ██╔══██╗██║   ██║██╔══██╗██╔══██╗    ╚════██╗
██║     ███████║██╔████╔██║██████╔╝    ██║  ███╗██████╔╝██║   ██║██████╔╝██████╔╝     █████╔╝
██║     ██╔══██║██║╚██╔╝██║██╔═══╝     ██║   ██║██╔══██╗██║   ██║██╔═══╝ ██╔═══╝     ██╔═══╝ 
███████╗██║  ██║██║ ╚═╝ ██║██║         ╚██████╔╝██║  ██║╚██████╔╝██║     ██║         ███████╗
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝          ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝         ╚══════╝

  _____        __      
 |_   _|      / _|     
   | |  _ __ | |_ ___  
   | | | '_ \|  _/ _ \ 
  _| |_| | | | || (_) |
 |_____|_| |_|_| \___/ 

Khet, Samuel och Amjad - Vi hade i uppgift att göra en smart belysning. Vårt resultat blev en tak/bords lampa som kan anpassa till det man behöver med hjälp av projektorduks 
fjäder och dess mekanism. Samt att vi ska kunna justera ljusstrykan på lampan som hur man själv vill ha det!

Vi hade skapat backen med hjälp av node där den kan köra funktionerna POST, PATCH, GET oc DELETE som sedan är kopplade till databasen MySQLDatabase. Därifrån hämtar lampan
värde för att veta om den ska vara tänd, släckt eller om den ska uppdatera ljusstyrka. 

På frontend hade vi använt https://interactiveappbuilder.com/ för att börja med att göra vår mobil app. Sedan hade vi kodad med React Native. Vi har just 2 skärmar som:

1. Ta bort alla värde som redan finns för att hindra duplicerade värden samt lägga till en hel ny värde som ska då tända lampan och samtidigt gå till andra skärmen.
2. Har 2 slider som kan ändra på ljusstyrka. Den ena för att ändra varma belysningen och den andra för den kalla. Samt en knapp som tabort allt som finns i databasen för att 
släcka lampan.

Vi hade även skrivit en kod i C++ som vi laddade upp i vår mikroprocessor för att få själva värde från databasen som sedan skickas till lampan för att informera lampan i fall 
den ska vara tänd, släckt eller om den ska uppdatera ljusstyrka. Mikroprocessorn är då kopplade till varma och kalla LED stripsar som skall styras.

  ____             _                  _ 
 |  _ \           | |                | |
 | |_) | __ _  ___| | _____ _ __   __| |
 |  _ < / _` |/ __| |/ / _ \ '_ \ / _` |
 | |_) | (_| | (__|   <  __/ | | | (_| |
 |____/ \__,_|\___|_|\_\___|_| |_|\__,_|
                                        
*en-ljus-ide-g2\Backend\API\routes\light.js - detta är backend som är grunden till frontend, databasen samt mikroprocessorn

För att kunna använda backend behöver du framförallt en coding software till exempel VisualStudio. För att kunna köra backend behöver du vara ansluten till Apache och MySQL genom
ett program som heter XAMPP Control Panel. Sedan behöver du ladda ner alla node modules in i backend. Det gör du genom att öppna terminalen i light.js
(höger klcika på filen till vänster och klicka sedan på "Open in Terminal") och sedan skriva 'npm install'. När nedladdningen hade slutfört, kör node genom att skriva i terminalen
'npm start'.

  ______               _                 _ 
 |  ____|             | |               | |
 | |__ _ __ ___  _ __ | |_ ___ _ __   __| |
 |  __| '__/ _ \| '_ \| __/ _ \ '_ \ / _` |
 | |  | | | (_) | | | | ||  __/ | | | (_| |
 |_|  |_|  \___/|_| |_|\__\___|_| |_|\__,_|
                                           
*en-ljus-ide-g2\Frontend\app\components\screen1\Screen1 - detta är startskärmen och dess inställningar
*en-ljus-ide-g2\Frontend\app\components\screen1\Component1 - knappen i startskärmen som tänds lampan
*en-ljus-ide-g2\Frontend\app\components\screen2\Screen2 - detta är andraskärmen där alla slider ligger och av knappen
*en-ljus-ide-g2\Frontend\app\components\screen2\Component9 - den andra component som släcker ljuset
*en-ljus-ide-g2\Frontend\app\components\screen2\Component11 - dem tredje och sista component som är 2 slider

Samma sak med backend, för att kunna köra frontend behöver man också ha node modules till detta. Därför måste man köra 'npm install' igen fast på vilken fil som helst som ligger i \Frontend filen. För att kunna köra appen i sin
mobiltelefon måste man ha en app av utvecklaren "Nametag" som heter "Expo" eller "Expo Client", skriv i ternimalen sedan 'npm install expo' för att frontend ska kunna köra. Sedan kan man skriva 'npm start' i terminalen och frontend ska
börja igång. Det ser du när du får upp en instruktion som visar dig olika sätt du kan öppna din mobil app i din mobiltelefon. Personligen, det bästa sättet är att trycka på 'q' och då ska en QR kod genereras. Förstora sedan terminalen
och skanna av QR koden med din kamera (fungerar med de flesta moderna mobiltelefoner, annars krävs det en QR läsare app). Se till att din mobiltelefon och datorn är uppkopplade till samma nätverk.

                   _       _             
     /\           | |     (_)            
    /  \   _ __ __| |_   _ _ _ __   ___  
   / /\ \ | '__/ _` | | | | | '_ \ / _ \ 
  / ____ \| | | (_| | |_| | | | | | (_) |
 /_/    \_\_|  \__,_|\__,_|_|_| |_|\___/ 
                                         
*en-ljus-ide-g2\Arduino\Backend_lampa\Backend_lampa.ino - detta är koden som ska vara uppladdad till mikroprocessorn.

Koden ovan är det som kopplar lampan till databasen. För att använda koden måste man ladda upp koden ner till sin mikroprocessor.


███████╗███╗   ██╗██████╗ 
██╔════╝████╗  ██║██╔══██╗
█████╗  ██╔██╗ ██║██║  ██║
██╔══╝  ██║╚██╗██║██║  ██║
███████╗██║ ╚████║██████╔╝
╚══════╝╚═╝  ╚═══╝╚═════╝ 