"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCuisine = exports.updateCuisine = exports.createCuisine = exports.getCuisineById = exports.getAllCuisines = void 0;
const Cuisine_1 = __importDefault(require("../models/Cuisine"));
// Hämtar alla Rätter
const getAllCuisines = async (req, res) => {
    try {
        const filterParam = req.query.filter;
        const filters = filterParam ? filterParam.split(",") : [];
        const Page = req.query.Page;
        // Hämta valt sjukhus från query-parametrar som jag skickar från frontend
        const valtSjukhus = req.query.hospital;
        // Om inget sjukhus är valt, returnera en tom array eller ett meddelande
        if (!valtSjukhus) {
            // return res.json(["Inget sjukhus Valt..."]); // Returnera en tom array om inget sjukhus är valt
            // Alternativt kan du skicka ett meddelande:
            return res.status(400).json({ message: "Vänligen välj ett sjukhus." });
        }
        // Bygg frågan för att filtrera på 'allergies'
        const query = {};
        if (filters.length > 0) {
            // Använd $all för att matcha alla filtervärden i 'allergies'
            query.allergies = { $all: filters.map((f) => new RegExp(f, "i")) };
        }
        if (Page) {
            query.Page = Page;
        }
        // Om valtsjukhus skickas med så binds det värdet in i query.hospital
        if (valtSjukhus) {
            query.hospital = valtSjukhus;
        }
        // Här skickas sedan alla quey förfrågningar in i find som tar fram alla önskade förfrågningar
        const cuisines = await Cuisine_1.default.find(query);
        res.json(cuisines);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllCuisines = getAllCuisines;
// Hämta en specifik
//
const getCuisineById = async (req, res) => {
    try {
        const cuisine = await Cuisine_1.default.findById(req.params.id);
        if (!cuisine)
            return res.status(404).json({ message: "Cuisine not found" });
        res.json(cuisine);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.getCuisineById = getCuisineById;
// Skapa en rätt
const createCuisine = async (req, res) => {
    // Logga mottagna data för felsökning
    console.log("Request body:", req.body);
    console.log("Request File", req.file);
    const hospital = req.body.Sjukhus;
    const dish = req.body.Rubrik;
    const information = req.body.Info;
    const Page = req.body.Page;
    console.log("kooomigen", Page);
    // Array med allerginamn
    const allergyKeys = [
        { name: "Glutenfri", value: req.body.Glutenfri },
        { name: "Laktosfri", value: req.body.Laktosfri },
        { name: "Fläskfri", value: req.body.Fläskfri },
        { name: "Vegetarisk", value: req.body.Vegetarisk },
        { name: "Mjölkproteinfri", value: req.body.Mjölkproteinfri },
        { name: "Vegan", value: req.body.Vegan },
    ];
    // Filtrera och skapa allergies-arrayen
    const allergies = allergyKeys
        .filter((allergy) => allergy.value === "true") // Behåll endast de med värdet 'true'
        .map((allergy) => allergy.name); // Extrahera namnen på allergierna
    const price = req.body.Pris;
    const options = req.body.Alternativ;
    const quantity = req.body.Antal;
    const cuisine = new Cuisine_1.default({
        hospital,
        dish,
        information,
        allergies,
        image: req.file?.path,
        price,
        options,
        quantity,
        Page,
    });
    try {
        const newCuisine = await cuisine.save();
        res.status(201).json({
            message: "A new cuisine has been created",
            cuisine: newCuisine,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong when trying to create a new cuisine",
            cuisine: error,
        });
    }
};
exports.createCuisine = createCuisine;
// Uppdatera rätt
const updateCuisine = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        let updatedCuisine = req.body;
        if (req.file) {
            updatedCuisine.image = req.file?.path;
        }
        const updateCuisine = await Cuisine_1.default.findByIdAndUpdate(req.params.id, updatedCuisine, { new: true });
        if (!updateCuisine)
            return res.status(404).json({ message: "Cuisine not found" });
        res.json(updateCuisine);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
exports.updateCuisine = updateCuisine;
// Ta bort en
const deleteCuisine = async (req, res) => {
    try {
        const deleteCuisine = await Cuisine_1.default.findByIdAndDelete(req.params.id);
        if (!deleteCuisine)
            return res.status(404).json({ message: "Cuisine not found" });
        res.json({ message: "Cuisine Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.deleteCuisine = deleteCuisine;
