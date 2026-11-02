// Run with: mongosh < commands.js

// 1. Database and collection
use archFirmDB;
db.createCollection("projects");
show collections;

// 2. Insert
db.projects.insertOne({
  project_id: 101,
  name: "Lakeside Residence",
  type: "Residential",
  budget: 5000000,
  tags: ["modern", "lake"]
});

db.projects.insertMany([
  { project_id: 102, name: "City Library", type: "Public", budget: 20000000, tags: ["glass", "eco"] },
  { project_id: 103, name: "Heritage Hotel", type: "Commercial", budget: 15000000, tags: ["restoration"] },
  { project_id: 104, name: "Tiny Cabin", type: "Residential", budget: 800000, tags: ["wood", "eco"] }
]);

// 3. Read
db.projects.find();
db.projects.find({ type: "Residential" });
db.projects.find({ budget: { $gte: 10000000 } });
db.projects.find({ $or: [{ type: "Public" }, { tags: "wood" }] });
db.projects.find({}, { name: 1, budget: 1, _id: 0 });
db.projects.findOne({ project_id: 101 });
db.projects.countDocuments({ type: "Residential" });

// 4. Update
db.projects.updateOne({ project_id: 101 }, { $set: { budget: 5500000 } });
db.projects.updateMany({ type: "Residential" }, { $push: { tags: "private" } });
db.projects.updateOne({ project_id: 102 }, { $inc: { budget: 1000000 } });

// 5. Index
db.projects.createIndex({ project_id: 1 }, { unique: true });
db.projects.getIndexes();

// 6. Delete
db.projects.deleteOne({ project_id: 103 });
db.projects.deleteMany({ budget: { $lt: 1000000 } });
db.projects.drop();
db.dropDatabase();
