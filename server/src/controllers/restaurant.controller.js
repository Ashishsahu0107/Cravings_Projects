import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.resolve(process.cwd(), "data", "restaurants.json");
const FALLBACK_DATA_FILE = path.resolve(process.cwd(), "server", "data", "restaurants.json");

async function readData() {
  for (const file of [DATA_FILE, FALLBACK_DATA_FILE]) {
    try {
      const raw = await fs.readFile(file, "utf-8");
      return JSON.parse(raw);
    } catch {
      // try next path
    }
  }
  return [];
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  try {
    await fs.writeFile(FALLBACK_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // ignore fallback write errors
  }
}

export const getRestaurants = async (_req, res, next) => {
  try {
    const restaurants = await readData();
    return res.json(restaurants);
  } catch (err) {
    next(err);
  }
};

export const createRestaurant = async (req, res, next) => {
  try {
    const { name, description, image, cuisines, city, deliveryTime, price, rating, menu = [] } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "name and description are required" });
    }

    const restaurants = await readData();
    const newRestaurant = {
      id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name,
      rating: rating || "4.5",
      image: image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      description,
      cuisines: Array.isArray(cuisines) ? cuisines : (cuisines || "").split(",").map((item) => item.trim()).filter(Boolean),
      city: city || "New City",
      deliveryTime: deliveryTime || "20-30 min",
      price: price || "₹250 for two",
      menu: Array.isArray(menu) ? menu : []
    };

    restaurants.push(newRestaurant);
    await writeData(restaurants);
    return res.status(201).json(newRestaurant);
  } catch (err) {
    next(err);
  }
};

export const getMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurants = await readData();
    const rest = restaurants.find((r) => r.id === id);
    if (!rest) return res.status(404).json({ message: "Restaurant not found" });
    return res.json(rest.menu || []);
  } catch (err) {
    next(err);
  }
};

export const setMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { menu } = req.body;
    if (!Array.isArray(menu)) return res.status(400).json({ message: "menu must be an array" });
    const restaurants = await readData();
    const idx = restaurants.findIndex((r) => r.id === id);
    if (idx === -1) return res.status(404).json({ message: "Restaurant not found" });
    restaurants[idx].menu = menu;
    await writeData(restaurants);
    return res.json({ message: "Menu updated", menu });
  } catch (err) {
    next(err);
  }
};





