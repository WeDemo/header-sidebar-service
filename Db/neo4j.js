var neo4j = require('neo4j-driver').v1;


var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"));

// Close the driver when application exits.
// This closes all used network connections.
// driver.close();



const session = driver.session();

// session.run();


// id,title,description,tag,rating,count_ratings,enrollment,created_by,created_at,updated_at,language,img_url,list_price,discount_price,video_hrs,total_articles,total_downloads,active_coupon,cc_options
// 1,[Intermediate] Spatial Analysis: Deciphering Climate,Dive in and learn compressing online SAS,Highest Rated,4.6,223,227,Carissa Bayer,9/2016,11/2018,English,https://s3.amazonaws.com/header-sidebar-service/course43.jpg,$160.99,$20.99,26,12,7,WEDEMO,Italian
// 2,Dialectical Behaviour Therapy (Rebt) Certificate (Beginner To 20Th Century,An adventure in compressing digital GB,Highest Rated,4.8,213,460,Nora Graham,3/2015,5/2015,"English, Korean",https://s3.amazonaws.com/header-sidebar-service/course29.jpg,$284.99,$45.99,29,13,12,WEDEMO,
// 3,Scratch,A complete guide for copying open-source PCI,Highest Rated,4.8,35,40,Lowell Spinka,11/2018,11/2018,"English, Spanish",https://s3.amazonaws.com/header-sidebar-service/course67.jpg,$262.99,$49.99,26.3,11,7,WEDEMO,Japanese
// 4,Ne


// tag ccoption

// WHERE row.rating <> ""


// WITH row, c
// WHERE row.cc_options <> ""
// cc_options: row.cc_options,
// tag: row.tag,`
// node --max_old_space_size=8192 neo4j.js

const insert = `USING PERIODIC COMMIT
 LOAD CSV WITH HEADERS
 FROM "file:///courses.csv"
 AS row
 CREATE(c:Course {
  id: toINT(row.id),
  title: row.title,
  description: row.description,
  rating: toFloat(row.rating),
  count_ratings: toFloat(row.count_ratings),
  enrollment: toInt(row.enrollment),
  created_by: row.created_by,
  created_at: row.created_at,
  updated_at: row.updated_at,
  language: row.language,
  img_url: row.img_url,
  list_price: toFloat(row.list_price),
  discount_price: toFloat(row.discount_price),
  video_hrs: toFloat(row.video_hrs),
  total_articles: toInt(row.total_articles),
  total_downloads: toInt(row.total_downloads),
  active_coupon: row.active_coupon,
  cc_options: row.cc_options,
   firstName: row.first_name,
   lastName: row.last_name
 })`;


 
 session.run(insert).then((result) => {
     console.log('success');
     session.close();
     driver.close();
   })
   .catch(err => session.close());

session.close();

const query = `MATCH (c:Course {id: 1}) RETURN C`;