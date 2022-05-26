const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedsHelper');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=> {
    console.log("Database connected")
})
.catch((err) => {
    console.log("CONNECTION ERROR!!!")
    console.error(err)
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https:/source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cum labore placeat dicta aliquid quo fuga perspiciatis assumenda saepe, eligendi maxime consequuntur dolorum quas deserunt. Nulla voluptate molestiae tempora sed?',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});