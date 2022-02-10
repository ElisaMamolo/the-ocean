### The Ocean

#### Description of the project

![Screenshot](Capture.PNG)

#### Wireframes

Before starting developing we have defined a initial structure of our pages and we have defined a set of MVP functionalities.
![Wireframe landingpage](../master/public/images/landingpage.png)

#### User Stories

#### Setup(Optional)

#### Technologies Used

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

| route | user | nft | description |
| ----- | ---- | --- | ----------- |
|       |      |     |             |
|       |      |     |             |
|       |      |     |             |

#### Demo(Optional) (Screenshots or GIFs of the application)

#### Project Link

https://the-ocean-shop.herokuapp.com/

#### Future Work

#### Resources

#### Team members
