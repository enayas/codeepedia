import "dotenv/config";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});
const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);


    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "JavaScript",
        imageSrc: "js.svg",
      },
      {
        id: 2,
        title: "HTML",
        imageSrc: "html.svg",
      },
      {
        id: 3,
        title: "CSS",
        imageSrc: "css.svg",
      },
      {
        id: 4,
        title: "Python",
        imageSrc: "py.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // JavaScript
        title: "Unit 1",
        description: "Learn the basics of JavaScript.",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id:1,
        unitId:1, // JavaScript
        order: 1,
        title: "Data Types",
      },
      {
        id:2,
        unitId:1, // JavaScript
        order: 2,
        title: "Variables",
      },
      {
        id:3,
        unitId:1, // JavaScript
        order: 3,
        title: "Variables",
      },
      {
        id:4,
        unitId:1, // JavaScript
        order: 4,
        title: "Variables",
      },
      {
        id:5,
        unitId:1, // JavaScript
        order: 5,
        title: "Variables",
      }
    ]);

    await db.insert(schema.challenges).values([
      {
        id:1,
        lessonId: 1,
        type: "SELECT",
        order:1,
        question: 'What data type can hold sentences?',
      },
    ]);
    
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId:1,
        imageSrc: "/string.svg",
        correct:true,
        text: "String",
      },
      {
        id: 2,
        challengeId:1,
        imageSrc: "/integer.svg",
        correct:false,
        text: "Integer",
      },
      {
        id: 3,
        challengeId:1,
        imageSrc: "/boolean.svg",
        correct:false,
        text: "Boolean",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};




main();