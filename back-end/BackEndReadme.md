app.ts

skapar en instans av en expressaplikation och sedan så öppnar app.get till att förfrågningar skickas till rotvägen. Denna fil kommer att hantera logiken i applikationen och route.deffinitioner.

server.ts

server.ts importerar expressapplikation från app.ts. Denna fil skapar en server som lyssnar efter aktivitet vid den deffinerade porten.

db.ts

Denna fil hanterar uppkopplingen till MongoDb databasen. Den har en del console.log som visar om uppkopplingen fungerat. Denna fil säkerställer att din applikation kan kommunicera med databasen genom att etablera en anslutning

VAD SKA GÖRAS:

Du behöver:

För att hantera data som den du beskriver i din MongoDB-databas och implementera CRUD-operationer i din Express-applikation med Mongoose, behöver du definiera ett schema som reflekterar strukturen på dessa dokument. Här är en steg-för-steg-guide för att skapa och använda en modell i Mongoose baserat på den information du har:
