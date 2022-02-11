### The Ocean

#### Description of the project

This is an NFT marketplace, users can create an account and start buying NFTs with our token called SeaShell. We have tried to replicate the functionality and the concept of "Open Sea" with a learning purpose.

#### Wireframes

Before starting developing we have defined a initial structure of our pages and we have defined a set of MVP functionalities.
![Wireframe landingpage](https://github.com/ElisaMamolo/the-ocean/blob/master/public/images/landingpage.PNG)

#### User Stories

- As a user visiting The Ocean I would like to view all the NFTs

- As a user visiting The Ocean I would like to see NFT attributes

- As a user visiting The Ocean I would like to be able to Signup

- As a user visiting The Ocean I would like to be able to Login

- As a user visiting The Ocean I would like to be able to see my profile details

- As a user visiting The Ocean I would like to be able to purchase an NFT

- As a user visiting The Ocean I would like to accumulate SeaShells

- Signing up, logging in regularly etc.

- As an Admin user I would like to be able to add NFTs

- As an Admin user I would like to be able to delete NFTs

- As an Admin user I would like to be able to edit NFT attributes

#### Technologies Used

:computer:

- Express
- MongoDB & Mongoose
- MongoDB Atlas - db deployment
- Heroku - app deployment
- Bootstrap
- Handlebars

#### Models

We have 2 types of users, admin and normal users.\
Admin can create, edit and delete nfts\
User can buy nfts

##### User Model

Pregenerated with ironlauncher and enhanced\
Properties:

- username: { type: String, required: true, unique: true,},
- password: String,
- isAdmin: { type: Boolean, default: false },
- shells: Number,
- asset: [{ type: Schema.Types.ObjectId, ref: "Nft" }],

##### Nft Model

Properties:\

- name, { type: String },
- image: String,
- owner: { type: Schema.Types.ObjectId, ref: "User" },
- creator: String,
- price: Number,

#### Server routes table(Method, Route or URL, Description as columns)

|     | route               | description                                                                                                                      |     |
| --- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --- |
|     | ---auth---          | -------------------------------------------------------------------------------------------------------------------------------- |     |
|     | /signup             | get and post for showing the form and to signup                                                                                  |     |
|     | /login              | get and post for showing the form and to login                                                                                   |     |
|     | /logout             | logout and redirect to homepage                                                                                                  |     |
|     | /details            | get user details and show its asset, render auth/user-detail                                                                     |     |
|     | ---nft---           | -------------------------------------------------------------------------------------------------------------------------------- |     |
|     | /create             | get and post for creating a new nft redirect to nft/create and index                                                             |     |
|     | /nfts/:nftId/edit   | get nft by id and edit it with post                                                                                              |     |
|     | /nfts/:nftId/delete | post to delete an nft by id                                                                                                      |     |
|     | /nfts/:nftId/buy    | post, validate if can afford and if token is not alrady of the user, then change owner and subtract token from buyer and seller  |     |
|     | ---index---         | -------------------------------------------------------------------------------------------------------------------------------- |     |
|     | /                   | get all the nfts and render index                                                                                                |     |

#### Demo(Optional) (Screenshots or GIFs of the application)

#### Project Link

https://the-ocean-shop.herokuapp.com/

#### Future Work

:wrench:

- We would like to finish implementing the functionality of rewarding login. So if the user logs in for multiple days in a row, earns some extra SeaShells (our currency).
- We would like to add some styling to the cards to make them even more responsive. When uploading pictures of different sizes the cards size changes.

:wrench:

#### Resources

- Bootstrap templates for divs and cards structure
- Bored Ape Images and Open Sea concept have been used in the app.
- Ironlauncher npm package - for generating the structure of the project and for handling authorization

#### Team members

Christian\
Elisa

#### This is a learning project, if anything needs to be removed please reach out and it will be removed right away.
