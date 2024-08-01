app.ts

skapar en instans av en expressaplikation och sedan så öppnar app.get till att förfrågningar skickas till rotvägen. Denna fil kommer att hantera logiken i applikationen och route.deffinitioner.

Express():
Skapar en instans av expressapplikationen

app.use(express.json());:

Omvandlar json som skickas genom http anrop till javascript-object för att kunna skicka runt dom i applikationen.

app.use(cors());:

Används för att kunna ta emot förfrågningar från en annan server och andra portar. Cors står för
Cross-Origin Resource Sharing om man inte installerar och använder denna så kan man inte göra ett http anrop från en annan domän, port eller protokoll.

server.ts

server.ts importerar expressapplikation från app.ts. Denna fil skapar en server som lyssnar efter aktivitet vid den deffinerade porten. Jag har satt porten 5000 som standard port men om den skulle vara upptagen så sätts den till port 3000 i default läge. Men innan den startar servern så försöker denna fil koppla upp sig mot connectDB som är deffinerad i db.ts som är uppkopplingen mot mongooseDB Compass. connectDB() har await framför sig och är en asynkron funktion. Detta betyder att den kommer att vänta kvar tills den har kopplat upp till databasen. Om den inte skulle lyckas med detta så kommer denna funktion av avbrytas och den kommer att kasta error meddelande istället. Om anslutningen till mongooseDB lyckas så triggas även app.listen som startar en express-server och lyssnar på inkommande http anrop till den specifiserade porten.

db.ts

Denna fil hanterar uppkopplingen till MongoDb databasen. Den har en del console.log som visar om uppkopplingen fungerat. Denna fil säkerställer att din applikation kan kommunicera med databasen genom att etablera en anslutning

VAD SKA GÖRAS:

Du behöver:

För att hantera data som den du beskriver i din MongoDB-databas och implementera CRUD-operationer i din Express-applikation med Mongoose, behöver du definiera ett schema som reflekterar strukturen på dessa dokument. Här är en steg-för-steg-guide för att skapa och använda en modell i Mongoose baserat på den information du har:
