## Synopsis

A React Native app that suggests ingredients containing a given nutrient.

## Motivation

Once upon a time, I was vegan and Googled "what vegetables contain calcium?" precisely a bajillion times. The next day I went back to being a vegetarian, but realized I could still use nutritional inspiration when throwing together a pasta or deciding what to order for lunch.

## Methodology

When you tap a nutrient from the last, the app queries the USDA api for the top 25 vegetable products that contain that nutrient, and displays a random one to the user. If the user wishes for more inspiration, they can cycle through the other veggies that contain that nutrient. The images come from the Microsoft Cognitive Services image search API. The app displays a random image from the top 5 returned when searching for the vegetable name. That *usually* turns out to be a picture of the vegetable.

## Why just veggies?

Originally the app supported every good group, but the USDA data is not as uniform or helpful for other food groups. For example, the "Beef Products" food group mostly returns different preparations of beef with roughly equvialent nutritional breakdown ... so it's not as useful if you're trying to decide what ingredients to toss in your pasta or salad. Eventually I'd like to build out my own API that includes data about diet compatilbility, daily nutritional needs, and more consistent human-readable names. For now, hat tip to the USDA for making their data publicly available for free.

## Challenge

Make a salad from the first 5 ingredients you're suggested, and let me know how it goes @pandananta 

## Citation
U.S. Department of Agriculture, Agricultural Research Service. 2017. USDA Branded Food Products Database . Nutrient Data Laboratory Home Page, http://ndb.nal.usda.gov

Microsoft Cognitive Services. 2017. Bing Image Seach API . https://azure.microsoft.com/
