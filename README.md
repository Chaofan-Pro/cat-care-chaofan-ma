# Project Title

# 😻Cat Care😻

## Overview

"**Cat Care**" is an app designed for cat owners to easily document and track important aspects of their cats' well-being, such as toilet habits, vet appointments, and food preferences. The app aims to help owners provide better care and stay organized, ensuring their cats' health and happiness are closely monitored.

### Problem Space

As a new cat owner, I quickly realized the need for an app to track my cat's information because it's hard to remember everything. I’m sure other cat owners can relate.
As we know, cats can’t communicate in English, so I can't ask them about their favorite food or how old they’ll be next week. Most importantly, cats are incredibly resilient and won’t express when they’re feeling unwell in a way I can easily understand. By the time many owners notice their cat is sick, the symptoms may already be quite serious. Regularly monitoring their health—such as tracking their weight and bathroom habits—can help identify potential issues early, ensuring they can see a vet sooner.
In short, having an app to record all relevant cat information is essential for every cat owner.

### User Profile

The Cat Care app is designed for cat owners with one or more cats. Users can create individual profiles for each of their cats. If the project is successful and other pet owners want to use the app, I plan to introduce categories for different types of animals. This way, pet profiles can be customized accordingly— for example, dog owners could track their dog’s daily walks.

### Features

😺 **Calendar with Categories:** Log cat-related information with specific categories for each entry.
- Cat weight
- Cat's toilet routine
- Vet appointments
- Vaccine dates

😺 **Food Rating:** dry food, wet food, snacks.
- Log food information: picture, brand, ingredients.
- Rate food from 1 to 5 according to your cat’s preferences
- Comment section to input more detailed info regarding the food.

## Implementation

### Tech Stack  

😺 **Frontend:** I will be using **React.js** to build a dynamic and interactive user interface. For styling, I will use **SASS**, which provides better modularity and maintainability. To optimize development speed and performance, I will set up the frontend with **Vite**, ensuring a fast and efficient build process.  

😺 **Backend:** The backend will be built with **Node.js** and **Express** to create a robust and scalable API. **MySQL** will be used as the relational database, with **Knex.js** as the query builder to simplify database interactions and migrations, ensuring efficient data management.


### APIs

I will be developing a API for the Cat Care app using Node.js with Express, designed to be able to create, read, update, and delete data.

### Sitemap

😺 **CATS PROFILES PAGE**
- Individual cats profiles overview with (click to enter different cat profile detail page)
  Display photo
  Name
  Age/birth date
  Gender
- Button to add cat

😺 **CAT PROFILE DETAIL/ADD/EDIT PAGE**(buttons different for each page)
- Cat info
  Display photo
  Name
  Age/birth date
  Gender
  Color
  Weight
  Intro
- Button to edit cat
- Button link to cat food log page
- Button link to catlender page

😺 **FOOD LOG PAGE**
- Search bar to search for existing log
- List of food logs with button to delete or edit(linked to food log detail page)
  Food name
  Food brand
  Food type
  Food ratings
- Button to add food

😺 **FOOD LOG DETAIL/ADD/EDIT PAGE**(buttons different for each page)
- Display food info
  Food photo
  Food name
  Food brand
  Food type
  Food ratings from different cats
  Food comments from different cats
- Button to delete/edit food
- Button to save add/edit food
- Button to cancel

😺 **CATLENDER PAGE**
- Overview of the month which show different dot of which day has what type of logs
- List of event logs(linked to event detail page)
  Cat name
  Event type
  Event times
  Event time
  Event comment
- Button to add event

😺 **CATLENDER DETAIL/ADD/EDIT PAGE**(buttons different for each page)
- Display event info
  Cat name
  Event type
  Event times
  Event time
  Event photo
  Event comment
- Button to delete/edit event
- Button to save add/edit event
- Button to cancel

### Mockups

Please use this figma [link](https://www.figma.com/design/woc5BfF9lMqHJLZsMpFRDb/Cat-Care?node-id=0-1&t=V5lM2v8quJNsg2rf-1).

### Data

There will be four tables as shown below. Since different cats have different preferences for food, each food log will have ratings from different cats. Cats table connects to food rating table and catlender table through cat name. Food log table connects to food rating table through food id.

😺 **Cats table**
- ID
- Display photo
- Name
- Age/birth date
- Gender
- Color
- Weight
- Intro

😺 **Food log table**
- ID
- Food photo
- Food name
- Food brand
- Food type(dry food, vet food, snacks)

😺 **Food rating table**
- ID
- Food id
- Cat name
- Cat rate food(from 1 to 5)
- Food comment

😺 **Catlender table**
- ID
- Cat name
- Date
- Time
- Event types (poop, peep, weight, vet appointments, vaccine dates, comment)
- Event times
- Event comment
- Event photo

### Endpoints

- GET/api/cats
- GET/api/cat
- POST/api/cat
- PUT/api/cat

- GET/api/foods
- GET/api/food
- POST/api/food
- PUT/api/food
- DELETE/api/food

- GET/api/catlenders
- GET/api/catlender
- POST/api/catlender
- PUT/api/catlender
- DELETE/api/catlender

## Roadmap

The project will run from February 10 to February 26.

😺**Feb 10 - Feb 16:** Set up the basic folder structure, establish the frontend code architecture, configure the backend structure, and complete backend functionality.

😺**Feb 17 - Feb 23:** Integrate the frontend with the backend to enable data creation, retrieval, updating, and deletion (CRUD operations), and work on styling.

😺**Feb 23 - Feb 26:** Conduct final debugging, optimize functionality, and refine styling for a polished user experience.

## Future Implementations

**Reminder function:**
- Reminde cat owners to log their cat info regularly. 
- Reminde cat owners with up-coming vet appointment. 

**Integrate ChatGPT** or other generative AI as a chatbot where cat owners can ask cat related questions. 

**Photo function:**
A photo section where cat owners can store the cat photos. 

**Authentication function:**
Add home page for user to create account or log in to use the app.




