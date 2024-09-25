ShoppingCart:

När man kommer in till varukorgen så hämtas alla items från Zustans-storen. Object.keys() tar ut alla nycklar från storen som är maträtternas id och lägger dom i en Array i uniquIds. Sedan så mappas denna array och det gör en fatch på alla nycklar i arrayen för att hämta datan.const results = await Promise.all(fetchPromises); gör att koden stannar till här tills alla fetchanrop är klara. När alla onrop är gjorde tas variabeln resultat och mappas genom att binda item.\_id till itemId och sedan sätta denna nyckel i items[itemId] så tar man \_id från varjerätt i arrayen och kollar om denna nyckel matchar med items om den gör det så returneras amount till detta maträtt.

totalsumm()
För att kunna visa användare totalsumma använde jag mig av reduce. Reduce har sum och item. Sum står för det ingåendevärdet i varje genomgång av arrayen. Sum sätts som starvärde på noll. Första itemet gårigenom och amount knyts till antal och price knyts till pris i returnen sätts summan plus antal gånger pris som summeras och detta sätts till ingående sum till nästa sak från arrayen som ska gås igenom på samma sätt. totalSumma(), knyts sedan till const totalPris som får värdet av den totalasumman som sedan visas i p-taggen i returnen på ShoppingCart.tsx

Payment

Denna sida får genom navigate skickat till sig itemsVarukorg och totalPris dessa variabler kommer från ShoppingCart.tsx och skickas genom Navigation() över till Payment. Från itemVarokurg som innehåller allting om varje dish så mappas disch som är namnet på varjerätt och amount som är antalet till variabeln nyttObjekt. nyttObjekt binds sedan till bariabel Orders i orderData för att matcha backendens variabler innan den skickas över. I try på handleMayment så skickas orderData med i body på fetchen som skickas till backenden. Jag installerade toastify för att kunna visa en snyggt pop up fönster som visas om fetchen går igenom eller ej.
