import { dbConfig } from "../config/dbConfig.js";
import { Sequelize, DataTypes } from "sequelize";
import User from "./UserModel.js";
import Universe from "./UniverseModel.js";
import Story from "./StoryModel.js";
import Character from "./CharacterModel.js";
import Relation from "./RelationModel.js";
import Location from "./LocationModel.js";
import Category from "./CategoryModel.js";
import Entry from "./EntryModel.js";
import Timeline from "./TimelineModel.js";
import Event from "./EventModel.js";
import TimelineEvent from "./TimelineEventModel.js";
import Tag from "./TagModel.js";
import Content from "./ContentModel.js";
import TagContent from "./TagContentModel.js";
import Text from "./TextModel.js";
import List from "./ListModel.js";
import ListItem from "./ListItemModel.js";

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate().then( ()=> {
    console.log('connected..');
}).catch(err => {
    console.log('Error: '+err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, DataTypes);
db.Universe = Universe(sequelize, DataTypes);
db.Story = Story(sequelize, DataTypes);
db.Character = Character(sequelize, DataTypes);
db.Relation = Relation(sequelize, DataTypes);
db.Location = Location(sequelize, DataTypes);
db.Category = Category(sequelize, DataTypes);
db.Entry = Entry(sequelize, DataTypes);
db.Timeline = Timeline(sequelize, DataTypes);
db.Event = Event(sequelize, DataTypes);
db.TimelineEvent = TimelineEvent(sequelize, DataTypes);
db.Tag = Tag(sequelize, DataTypes);
db.Content = Content(sequelize, DataTypes);
db.TagContent = TagContent(sequelize, DataTypes);
db.Text = Text(sequelize, DataTypes);
db.List = List(sequelize, DataTypes);
db.ListItem = ListItem(sequelize, DataTypes);

for(const property in db) {
    if(db[property].associate) {
        db[property].associate(db);
    }
}

db.sequelize.sync({force: false}).then(() => {
    console.log("Re-Sync done!");
});

export { db };
