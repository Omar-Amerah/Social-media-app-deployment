const { Post } = require("./models/index");
const { User } = require("./models/index");
const db = require("./db");
const moment = require('moment');

async function seedPosts() {
    const postdate = moment().format('dddd, D/M/YYYY'); // format postdate as 'Weekday, day/month/year'
    return await Post.bulkCreate([    
        {        
            title: "Feeling proud of myself for taking a risk",        
            content: "It's scary to put yourself out there, but I'm so glad I did. #risktaker #success", 
            UserId: 1,
            postdate: postdate      
        },    
        {       
            title: "Just finished an awesome workout",        
            content: "Feeling great and ready to take on the day #fitness #motivation",
            UserId: 2,
            postdate: postdate          
        },    
        {        
            title: "Excited to announce my new book",        
            content: "After months of hard work, I'm thrilled to announce the release of my new book! #writing #publishing",  
            UserId: 3,
            postdate: postdate        
        },    
        {        
            title: "Finally finished that DIY project",        
            content: "It took way longer than I expected, but I'm so proud of how it turned out! #DIY #homedecor",   
            UserId: 4,
            postdate: postdate         
        },    
        {        
            title: "Had an amazing meal at that new restaurant",        
            content: "If you're looking for delicious food and great service, check out the new restaurant on 5th street! #foodie #yum",
            UserId: 5,
            postdate: postdate           
        },    
        {       
            title: "Just got back from an incredible vacation",        
            content: "I had such an amazing time exploring new places and trying new things! #travel #adventure", 
            UserId: 6,
            postdate: postdate           
        },    
        {        
            title: "Can't wait for the new season of my favorite show",        
            content: "Only a few more days until the new season of my favorite show comes out! Who else is excited? #TV #entertainment",
            UserId: 7,
            postdate: postdate            
        },    
        {        
            title: "Had a great time catching up with old friends",        
            content: "It's been too long since we've seen each other, but it was like no time had passed at all! #friends #reunited",
            UserId: 8,
            postdate: postdate            
        },    
        {        
            title: "So grateful for my family",        
            content: "I don't know what I would do without their love and support. #family #grateful", 
            UserId: 9,
            postdate: postdate           
        },    
        {        
            title: "Just started a new hobby",        
            content: "I never realized how much I would enjoy painting! Excited to see where this new hobby takes me. #art #creative",
            UserId: 10,
            postdate: postdate            
        }]
);
}

async function seedUsers() {
    return await User.bulkCreate([
    { 
        username: "John", 
        password: "Fluffy78$", 
        email: "john@example.com" 
    },
    { 
        username: "Charlie", 
        password: "Buttercup42#", 
        email: "charlie@example.com" 
    },
    { 
        username: "Sam", 
        password: "Hiking19@", 
        email: "sam@example.com" 
    },
    {
        username: "Chinelo",
        password: "Sunflower27&",
        email: "chinelo@example.com"
    },
    {
        username: "Juan",
        password: "Starlight69#",
        email: "juan@example.com"
      },
      {
        username: "Yoko",
        password: "Pineapple12%",
        email: "yoko@example.com"
      },
      {
        username: "Sophie",
        password: "Nightowl55#",
        email: "sophie@example.com"
      },
      {
        username: "Aaliyah",
        password: "Coffeebean16*",
        email: "aaliyah@example.com"
      },
      {
        username: "Tina",
        password: "Beachbum23@",
        email: "tina@example.com"
      },
      {
        username: "Sarah",
        password: "Dragonfly99^",
        email: "sarah@example.com"
      }
      
    ]);
}

async function seed() {
    await db.sync({
        force: true,
    });

    // Bulk create users
    const users = await seedUsers();
    const posts = await seedPosts();
    
}

seed();

module.exports = seed;
