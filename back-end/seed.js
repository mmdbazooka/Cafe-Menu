const mongoose = require("mongoose");
const Category = require("./src/models/category.model");
const Item = require("./src/models/item.model");

const MONGODB_URI =
  "mongodb://localhost:27017/menu-digital";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    seedData();
  })
  .catch((err) => console.log(err));

const seedData = async () => {
  await Category.deleteMany({});
  await Item.deleteMany({});

  const categories = [
    { name: ["Hot-Drink", "نوشیدنی گرم"], img: "2" },
    { name: ["Coffee", "قهوه"], img: "12" },
    { name: ["Herbal", "دمنوش"], img: "9" },
    { name: ["Espresso", "اسپرسو"], img: "11" },
    { name: ["Cake", "کیک"], img: "5" },
    { name: ["Shake", "شیک"], img: "15" },
    { name: ["Ice-Coffee", "ایس کافی"], img: "10" },
    { name: ["Mocktail", "ماکتیل"], img: "17" },
    { name: ["Burger", "برگر"], img: "16" },
    { name: ["Pasta", "پاستا"], img: "8" },
    { name: ["Salad", "سالاد"], img: "1" },
    { name: ["Steak", "استیک"], img: "7" },
    { name: ["Smoothie", "اسموتی"], img: "4" },
    { name: ["Starter", "پیش غذا"], img: "18" },
    { name: ["Pizza", "پیتزا"], img: "6" },
    { name: ["Main", "غذای اصلی"], img: "14" },
  ];

  const items = [
    {
      name: "نسکافه گلد",
      img: "Hot-Drink/Nescoffee",
      price: 105000,
      likeCount: 2,
      category: "Hot-Drink",
      recipe: "شیر ، نسکافه گلد",
    },
    {
      name: "هات چاکلت",
      img: "Hot-Drink/HotChocolate",
      price: 110000,
      likeCount: 0,
      category: "Hot-Drink",
      recipe: "شکلات شیر داغ",
    },
    {
      name: "چای ماسالا",
      img: "Hot-Drink/Masala",
      price: 110000,
      likeCount: 0,
      category: "Hot-Drink",
      recipe: "",
    },
    {
      name: "وایت چاکلت",
      img: "Hot-Drink/WhiteChocolate",
      price: 110000,
      likeCount: 0,
      category: "Hot-Drink",
      recipe: "شکلات سفید ، شیر داغ",
    },
    {
      name: "نوتلا اکستریم",
      img: "Hot-Drink/Nutella",
      price: 125000,
      likeCount: 1,
      category: "Hot-Drink",
      recipe: "نوتلا ، شیر",
    },
    { name: "قهوه یونانی", img: "Coffee/Yonani", price: 95000, likeCount: 0, category: "Coffee", recipe: "" },
    { name: "قهوه ترک", img: "Coffee/Turk", price: 100000, likeCount: 1, category: "Coffee", recipe: "" },
    { name: "چای سیاه", img: "Herbal/Chaii", price: 60000, likeCount: 0, category: "Herbal", recipe: "" },
    {
      name: "آویشن",
      img: "Herbal/System",
      price: 138000,
      likeCount: 0,
      category: "Herbal",
      recipe: "آویشن ، دارچین",
    },
    {
      name: "بهارنارنج",
      img: "Herbal/Shadi",
      price: 135000,
      likeCount: 0,
      category: "Herbal",
      recipe: "بهارنارنج ، هل",
    },
    {
      name: "چای ترش",
      img: "Herbal/Paksazi",
      price: 130000,
      likeCount: 0,
      category: "Herbal",
      recipe: "میخک ، لیمو",
    },
    {
      name: "اسپرسو سینگل",
      img: "Espresso/Single",
      price: 85000,
      likeCount: 0,
      category: "Espresso",
      recipe: "یک انس اسپرسو",
    },
    {
      name: "آمریکانو",
      img: "Espresso/Americano",
      price: 99000,
      likeCount: 2,
      category: "Espresso",
      recipe: "دو انس اسپرسو",
    },
    {
      name: "اسپرسو ماکیاتو",
      img: "Espresso/Makiato",
      price: 90000,
      likeCount: 0,
      category: "Espresso",
      recipe: "یک انس اسپرسو ، فوم شیر",
    },
    {
      name: "رومانو",
      img: "Espresso/Romano",
      price: 90000,
      likeCount: 0,
      category: "Espresso",
      recipe: "یک انس اسپرسو ، لیمو ترش",
    },
    {
      name: "اسپرسو دبل",
      img: "Espresso/Double",
      price: 90000,
      likeCount: 5,
      category: "Espresso",
      recipe: "دو انس اسپرسو",
    },
    { name: "باقلوا", img: "Cake/Baghlava", price: 110000, likeCount: 3, category: "Cake", recipe: "" },
    { name: "کیک شکلاتی", img: "Cake/Kindar", price: 125000, likeCount: 7, category: "Cake", recipe: "" },
    {
      name: "شیک وانیل",
      img: "Shake/Vanil",
      price: 170000,
      likeCount: 0,
      category: "Shake",
      recipe: "بستنی وانیل ، شیر ، وانیل",
    },
    {
      name: "شیک بادام",
      img: "Shake/Badoom",
      price: 185000,
      likeCount: 0,
      category: "Shake",
      recipe: "بستنی ، کره بادام زمینی",
    },
    {
      name: "شیک شکلاتی",
      img: "Shake/DarkChocolate",
      price: 185000,
      likeCount: 4,
      category: "Shake",
      recipe: "بستنی شکلاتی ، پودر شکلات",
    },
    {
      name: "شیک نوتلا",
      img: "Shake/Nutella",
      price: 185000,
      likeCount: 2,
      category: "Shake",
      recipe: "نوتلا ، نوتلا بستنی",
    },
    {
      name: "آیس چاکلت",
      img: "Ice-Coffee/Chocolate",
      price: 125000,
      likeCount: 0,
      category: "Ice-Coffee",
      recipe: "شیر ، پودر شکلات ، یخ",
    },
    {
      name: "آیس آمریکانو",
      img: "Ice-Coffee/Americano",
      price: 110000,
      likeCount: 1,
      category: "Ice-Coffee",
      recipe: "دو انس اسپرسو ، یخ",
    },
    {
      name: "آیس موکا",
      img: "Ice-Coffee/Moka",
      price: 120000,
      likeCount: 2,
      category: "Ice-Coffee",
      recipe: "دو انس اسپرسو ، شکلات ، یخ",
    },
    {
      name: "آیس لاته",
      img: "Ice-Coffee/Late",
      price: 115000,
      likeCount: 0,
      category: "Ice-Coffee",
      recipe: "دو انس اسپرسو ، شیر ، یخ",
    },
    {
      name: "گوآوا لیموناد",
      img: "Mocktail/Goava",
      price: 175000,
      likeCount: 0,
      category: "Mocktail",
      recipe: "عصاره لیمو ، سیروپ گوآوا",
    },
    {
      name: "لیموناد",
      img: "Mocktail/Limoonad",
      price: 160000,
      likeCount: 1,
      category: "Mocktail",
      recipe: "لیمو ، شکر",
    },
  ];

  await Category.insertMany(categories);
  await Item.insertMany(items);

  console.log("Data seeded");
  process.exit();
};
