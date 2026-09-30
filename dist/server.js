
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url); 
   
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express2 from "express";

// src/app/module/auth/auth.route.ts
import { Router } from "express";

// src/app/utils/AppError.ts
var AppError = class extends Error {
  //
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/app/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/app/module/auth/auth.service.ts
import bcrypt from "bcryptjs";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/enums.ts
var Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SERVICE_WORKER: "SERVICE_WORKER",
  CITIZEN: "CITIZEN"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED"
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.10.0",
  "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Assign {\n  id     String       @id @default(uuid())\n  status AssignStatus @default(PENDING)\n\n  complainId String\n  complain   Complain @relation(fields: [complainId], references: [id], onDelete: Cascade)\n\n  serviceWorkerId String\n  serviceWorker   User   @relation("ServiceWorkerAssign", fields: [serviceWorkerId], references: [id], onDelete: Cascade)\n\n  // adminId String\n  // admin   User   @relation("AdminAssign", fields: [adminId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("assigns")\n}\n\nmodel Complain {\n  id String @id @default(uuid())\n\n  title       String\n  description String\n  location    String\n\n  imageUrl      String?\n  imagePublicId String?\n\n  proofImageUrl      String?\n  proofImagePublicId String?\n  proofDescription   String?\n\n  status ComplainStatus @default(PENDING)\n\n  price Float?\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  payments Payment[]\n  assigns  Assign[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("complains")\n}\n\nenum Role {\n  SUPER_ADMIN\n  ADMIN\n  SERVICE_WORKER\n  CITIZEN\n}\n\nenum AuthProvider {\n  GOOGLE\n  CREDENTIAL\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n}\n\nenum ComplainStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nenum PaymenStatus {\n  PENDING\n  COMPLETED\n  FAILED\n}\n\nenum AssignStatus {\n  PENDING\n  IN_PROGRESS\n  COMPLETED\n}\n\nmodel Payment {\n  id            String       @id @default(uuid())\n  transactionId String       @unique\n  amount        Float\n  status        PaymenStatus\n\n  complainId String\n  complain   Complain @relation(fields: [complainId], references: [id], onDelete: Cascade)\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  paidAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("payments")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String       @id @default(uuid())\n  name          String\n  email         String       @unique\n  password      String?\n  googleId      String?      @unique\n  authProvider  AuthProvider @default(CREDENTIAL)\n  emailVerified Boolean      @default(false)\n\n  imagePublicId String?\n  imageUrl      String? @default("")\n\n  role               Role       @default(CITIZEN)\n  status             UserStatus @default(ACTIVE)\n  needPasswordChange Boolean    @default(false)\n\n  complains            Complain[]\n  payments             Payment[]\n  ServiceWorkerAssigns Assign[]   @relation("ServiceWorkerAssign")\n  // adminAssigns         Assign[]   @relation("AdminAssign")\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Assign":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"AssignStatus"},{"name":"complainId","kind":"scalar","type":"String"},{"name":"complain","kind":"object","type":"Complain","relationName":"AssignToComplain"},{"name":"serviceWorkerId","kind":"scalar","type":"String"},{"name":"serviceWorker","kind":"object","type":"User","relationName":"ServiceWorkerAssign"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"assigns","schema":null},"Complain":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"proofImageUrl","kind":"scalar","type":"String"},{"name":"proofImagePublicId","kind":"scalar","type":"String"},{"name":"proofDescription","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ComplainStatus"},{"name":"price","kind":"scalar","type":"Float"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ComplainToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"ComplainToPayment"},{"name":"assigns","kind":"object","type":"Assign","relationName":"AssignToComplain"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"complains","schema":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"PaymenStatus"},{"name":"complainId","kind":"scalar","type":"String"},{"name":"complain","kind":"object","type":"Complain","relationName":"ComplainToPayment"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"PaymentToUser"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments","schema":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"complains","kind":"object","type":"Complain","relationName":"ComplainToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToUser"},{"name":"ServiceWorkerAssigns","kind":"object","type":"Assign","relationName":"ServiceWorkerAssign"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"users","schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","complains","complain","user","payments","ServiceWorkerAssigns","_count","assigns","serviceWorker","Assign.findUnique","Assign.findUniqueOrThrow","Assign.findFirst","Assign.findFirstOrThrow","Assign.findMany","data","Assign.createOne","Assign.createMany","Assign.createManyAndReturn","Assign.updateOne","Assign.updateMany","Assign.updateManyAndReturn","create","update","Assign.upsertOne","Assign.deleteOne","Assign.deleteMany","having","_min","_max","Assign.groupBy","Assign.aggregate","Complain.findUnique","Complain.findUniqueOrThrow","Complain.findFirst","Complain.findFirstOrThrow","Complain.findMany","Complain.createOne","Complain.createMany","Complain.createManyAndReturn","Complain.updateOne","Complain.updateMany","Complain.updateManyAndReturn","Complain.upsertOne","Complain.deleteOne","Complain.deleteMany","_avg","_sum","Complain.groupBy","Complain.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","googleId","AuthProvider","authProvider","emailVerified","imagePublicId","imageUrl","Role","role","UserStatus","status","needPasswordChange","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","transactionId","amount","PaymenStatus","complainId","userId","paidAt","title","description","location","proofImageUrl","proofImagePublicId","proofDescription","ComplainStatus","price","AssignStatus","serviceWorkerId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "vAInQAsEAACpAQAgCgAAqgEAIFMAAKcBADBUAAALABBVAACnAQAwVgEAAAABYwAAqAGEASJlQACOAQAhZkAAjgEAIXgBAIgBACGEAQEAiAEAIQEAAAABACAUBQAAqgEAIAYAAJABACAJAACRAQAgUwAArwEAMFQAAAMAEFUAAK8BADBWAQCIAQAhXgEAiQEAIV8BAIkBACFjAACwAYIBImVAAI4BACFmQACOAQAheQEAiAEAIXsBAIgBACF8AQCIAQAhfQEAiAEAIX4BAIkBACF_AQCJAQAhgAEBAIkBACGCAQgAsQEAIQkFAACeAgAgBgAAjAIAIAkAAI0CACBeAACyAQAgXwAAsgEAIH4AALIBACB_AACyAQAggAEAALIBACCCAQAAsgEAIBQFAACqAQAgBgAAkAEAIAkAAJEBACBTAACvAQAwVAAAAwAQVQAArwEAMFYBAAAAAV4BAIkBACFfAQCJAQAhYwAAsAGCASJlQACOAQAhZkAAjgEAIXkBAIgBACF7AQCIAQAhfAEAiAEAIX0BAIgBACF-AQCJAQAhfwEAiQEAIYABAQCJAQAhggEIALEBACEDAAAAAwAgAQAABAAwAgAABQAgDgQAAKkBACAFAACqAQAgUwAAqwEAMFQAAAcAEFUAAKsBADBWAQCIAQAhYwAArQF4ImVAAI4BACFmQACOAQAhdQEAiAEAIXYIAKwBACF4AQCIAQAheQEAiAEAIXpAAK4BACEDBAAAnQIAIAUAAJ4CACB6AACyAQAgDgQAAKkBACAFAACqAQAgUwAAqwEAMFQAAAcAEFUAAKsBADBWAQAAAAFjAACtAXgiZUAAjgEAIWZAAI4BACF1AQAAAAF2CACsAQAheAEAiAEAIXkBAIgBACF6QACuAQAhAwAAAAcAIAEAAAgAMAIAAAkAIAsEAACpAQAgCgAAqgEAIFMAAKcBADBUAAALABBVAACnAQAwVgEAiAEAIWMAAKgBhAEiZUAAjgEAIWZAAI4BACF4AQCIAQAhhAEBAIgBACECBAAAnQIAIAoAAJ4CACADAAAACwAgAQAADAAwAgAAAQAgAQAAAAMAIAEAAAAHACABAAAACwAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAALACABAAAMADACAAABACABAAAABwAgAQAAAAsAIAEAAAABACADAAAACwAgAQAADAAwAgAAAQAgAwAAAAsAIAEAAAwAMAIAAAEAIAMAAAALACABAAAMADACAAABACAIBAAAzgEAIAoAAPkBACBWAQAAAAFjAAAAhAECZUAAAAABZkAAAAABeAEAAAABhAEBAAAAAQEQAAAZACAGVgEAAAABYwAAAIQBAmVAAAAAAWZAAAAAAXgBAAAAAYQBAQAAAAEBEAAAGwAwARAAABsAMAgEAADMAQAgCgAA9wEAIFYBALYBACFjAADKAYQBImVAALwBACFmQAC8AQAheAEAtgEAIYQBAQC2AQAhAgAAAAEAIBAAAB4AIAZWAQC2AQAhYwAAygGEASJlQAC8AQAhZkAAvAEAIXgBALYBACGEAQEAtgEAIQIAAAALACAQAAAgACACAAAACwAgEAAAIAAgAwAAAAEAIBcAABkAIBgAAB4AIAEAAAABACABAAAACwAgAwgAAJoCACAdAACcAgAgHgAAmwIAIAlTAACjAQAwVAAAJwAQVQAAowEAMFYBAHAAIWMAAKQBhAEiZUAAdgAhZkAAdgAheAEAcAAhhAEBAHAAIQMAAAALACABAAAmADAcAAAnACADAAAACwAgAQAADAAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACARBQAAmQIAIAYAAIYCACAJAACHAgAgVgEAAAABXgEAAAABXwEAAAABYwAAAIIBAmVAAAAAAWZAAAAAAXkBAAAAAXsBAAAAAXwBAAAAAX0BAAAAAX4BAAAAAX8BAAAAAYABAQAAAAGCAQgAAAABARAAAC8AIA5WAQAAAAFeAQAAAAFfAQAAAAFjAAAAggECZUAAAAABZkAAAAABeQEAAAABewEAAAABfAEAAAABfQEAAAABfgEAAAABfwEAAAABgAEBAAAAAYIBCAAAAAEBEAAAMQAwARAAADEAMBEFAACYAgAgBgAA7QEAIAkAAO4BACBWAQC2AQAhXgEAtwEAIV8BALcBACFjAADqAYIBImVAALwBACFmQAC8AQAheQEAtgEAIXsBALYBACF8AQC2AQAhfQEAtgEAIX4BALcBACF_AQC3AQAhgAEBALcBACGCAQgA6wEAIQIAAAAFACAQAAA0ACAOVgEAtgEAIV4BALcBACFfAQC3AQAhYwAA6gGCASJlQAC8AQAhZkAAvAEAIXkBALYBACF7AQC2AQAhfAEAtgEAIX0BALYBACF-AQC3AQAhfwEAtwEAIYABAQC3AQAhggEIAOsBACECAAAAAwAgEAAANgAgAgAAAAMAIBAAADYAIAMAAAAFACAXAAAvACAYAAA0ACABAAAABQAgAQAAAAMAIAsIAACTAgAgHQAAlgIAIB4AAJUCACAvAACUAgAgMAAAlwIAIF4AALIBACBfAACyAQAgfgAAsgEAIH8AALIBACCAAQAAsgEAIIIBAACyAQAgEVMAAJwBADBUAAA9ABBVAACcAQAwVgEAcAAhXgEAcQAhXwEAcQAhYwAAnQGCASJlQAB2ACFmQAB2ACF5AQBwACF7AQBwACF8AQBwACF9AQBwACF-AQBxACF_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_ACAeAAB_ACBnIAAAAAFuIAB-ACEHCAAAeAAgHQAAfQAgHgAAfQAgZwAAAGECaAAAAGEIaQAAAGEIbgAAfGEiBwgAAHgAIB0AAHsAIB4AAHsAIGcAAABjAmgAAABjCGkAAABjCG4AAHpjIgsIAAB4ACAdAAB5ACAeAAB5ACBnQAAAAAFoQAAAAARpQAAAAARqQAAAAAFrQAAAAAFsQAAAAAFtQAAAAAFuQAB3ACELCAAAeAAgHQAAeQAgHgAAeQAgZ0AAAAABaEAAAAAEaUAAAAAEakAAAAABa0AAAAABbEAAAAABbUAAAAABbkAAdwAhCGcCAAAAAWgCAAAABGkCAAAABGoCAAAAAWsCAAAAAWwCAAAAAW0CAAAAAW4CAHgAIQhnQAAAAAFoQAAAAARpQAAAAARqQAAAAAFrQAAAAAFsQAAAAAFtQAAAAAFuQAB5ACEHCAAAeAAgHQAAewAgHgAAewAgZwAAAGMCaAAAAGMIaQAAAGMIbgAAemMiBGcAAABjAmgAAABjCGkAAABjCG4AAHtjIgcIAAB4ACAdAAB9ACAeAAB9ACBnAAAAYQJoAAAAYQhpAAAAYQhuAAB8YSIEZwAAAGECaAAAAGEIaQAAAGEIbgAAfWEiBQgAAHgAIB0AAH8AIB4AAH8AIGcgAAAAAW4gAH4AIQJnIAAAAAFuIAB_ACEHCAAAeAAgHQAAgQEAIB4AAIEBACBnAAAAXAJoAAAAXAhpAAAAXAhuAACAAVwiBGcAAABcAmgAAABcCGkAAABcCG4AAIEBXCIOCAAAgwEAIB0AAIQBACAeAACEAQAgZwEAAAABaAEAAAAFaQEAAAAFagEAAAABawEAAAABbAEAAAABbQEAAAABbgEAggEAIW8BAAAAAXABAAAAAXEBAAAAAQhnAgAAAAFoAgAAAAVpAgAAAAVqAgAAAAFrAgAAAAFsAgAAAAFtAgAAAAFuAgCDAQAhC2cBAAAAAWgBAAAABWkBAAAABWoBAAAAAWsBAAAAAWwBAAAAAW0BAAAAAW4BAIQBACFvAQAAAAFwAQAAAAFxAQAAAAEOCAAAeAAgHQAAhgEAIB4AAIYBACBnAQAAAAFoAQAAAARpAQAAAARqAQAAAAFrAQAAAAFsAQAAAAFtAQAAAAFuAQCFAQAhbwEAAAABcAEAAAABcQEAAAABC2cBAAAAAWgBAAAABGkBAAAABGoBAAAAAWsBAAAAAWwBAAAAAW0BAAAAAW4BAIYBACFvAQAAAAFwAQAAAAFxAQAAAAEUAwAAjwEAIAYAAJABACAHAACRAQAgUwAAhwEAMFQAAFkAEFUAAIcBADBWAQCIAQAhVwEAiAEAIVgBAIgBACFZAQCJAQAhWgEAiQEAIVwAAIoBXCJdIACLAQAhXgEAiQEAIV8BAIkBACFhAACMAWEiYwAAjQFjImQgAIsBACFlQACOAQAhZkAAjgEAIQtnAQAAAAFoAQAAAARpAQAAAARqAQAAAAFrAQAAAAFsAQAAAAFtAQAAAAFuAQCGAQAhbwEAAAABcAEAAAABcQEAAAABC2cBAAAAAWgBAAAABWkBAAAABWoBAAAAAWsBAAAAAWwBAAAAAW0BAAAAAW4BAIQBACFvAQAAAAFwAQAAAAFxAQAAAAEEZwAAAFwCaAAAAFwIaQAAAFwIbgAAgQFcIgJnIAAAAAFuIAB_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_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_AQCJAQAhgAEBAIkBACGCAQgAsQEAIQIAAAAFACAQAADsAQAgAgAAAOgBACAQAADpAQAgEVMAAOcBADBUAADoAQAQVQAA5wEAMFYBAIgBACFeAQCJAQAhXwEAiQEAIWMAALABggEiZUAAjgEAIWZAAI4BACF5AQCIAQAhewEAiAEAIXwBAIgBACF9AQCIAQAhfgEAiQEAIX8BAIkBACGAAQEAiQEAIYIBCACxAQAhEVMAAOcBADBUAADoAQAQVQAA5wEAMFYBAIgBACFeAQCJAQAhXwEAiQEAIWMAALABggEiZUAAjgEAIWZAAI4BACF5AQCIAQAhewEAiAEAIXwBAIgBACF9AQCIAQAhfgEAiQEAIX8BAIkBACGAAQEAiQEAIYIBCACxAQAhDVYBALYBACFeAQC3AQAhXwEAtwEAIWMAAOoBggEiZUAAvAEAIWZAALwBACF7AQC2AQAhfAEAtgEAIX0BALYBACF-AQC3AQAhfwEAtwEAIYABAQC3AQAhggEIAOsBACEBigEAAACCAQIFigEIAAAAAZABCAAAAAGRAQgAAAABkgEIAAAAAZMBCAAAAAEPBgAA7QEAIAkAAO4BACBWAQC2AQAhXgEAtwEAIV8BALcBACFjAADqAYIBImVAALwBACFmQAC8AQAhewEAtgEAIXwBALYBACF9AQC2AQAhfgEAtwEAIX8BALcBACGAAQEAtwEAIYIBCADrAQAhCxcAAPoBADAYAAD-AQAwhwEAAPsBADCIAQAA_AEAMIkBAAD9AQAgigEAANMBADCLAQAA0wEAMIwBAADTAQAwjQEAANMBADCOAQAA_wEAMI8BAADWAQAwCxcAAO8BADAYAADzAQAwhwEAAPABADCIAQAA8QEAMIkBAADyAQAgigEAAMQBADCLAQAAxAEAMIwBAADEAQAwjQEAAMQBADCOAQAA9AEAMI8BAADHAQAwBgoAAPkBACBWAQAAAAFjAAAAhAECZUAAAAABZkAAAAABhAEBAAAAAQIAAAABACAXAAD4AQAgAwAAAAEAIBcAAPgBACAYAAD2AQAgARAAAK8CADACAAAAAQAgEAAA9gEAIAIAAADIAQAgEAAA9QEAIAVWAQC2AQAhYwAAygGEASJlQAC8AQAhZkAAvAEAIYQBAQC2AQAhBgoAAPcBACBWAQC2AQAhYwAAygGEASJlQAC8AQAhZkAAvAEAIYQBAQC2AQAhBRcAAKoCACAYAACtAgAghwEAAKsCACCIAQAArAIAII0BAABWACAGCgAA-QEAIFYBAAAAAWMAAACEAQJlQAAAAAFmQAAAAAGEAQEAAAABAxcAAKoCACCHAQAAqwIAII0BAABWACAJBQAAhAIAIFYBAAAAAWMAAAB4AmVAAAAAAWZAAAAAAXUBAAAAAXYIAAAAAXkBAAAAAXpAAAAAAQIAAAAJACAXAACDAgAgAwAAAAkAIBcAAIMCACAYAACBAgAgARAAAKkCADACAAAACQAgEAAAgQIAIAIAAADXAQAgEAAAgAIAIAhWAQC2AQAhYwAA2gF4ImVAALwBACFmQAC8AQAhdQEAtgEAIXYIANkBACF5AQC2AQAhekAA2wEAIQkFAACCAgAgVgEAtgEAIWMAANoBeCJlQAC8AQAhZkAAvAEAIXUBALYBACF2CADZAQAheQEAtgEAIXpAANsBACEFFwAApAIAIBgAAKcCACCHAQAApQIAIIgBAACmAgAgjQEAAFYAIAkFAACEAgAgVgEAAAABYwAAAHgCZUAAAAABZkAAAAABdQEAAAABdggAAAABeQEAAAABekAAAAABAxcAAKQCACCHAQAApQIAII0BAABWACAPBgAAhgIAIAkAAIcCACBWAQAAAAFeAQAAAAFfAQAAAAFjAAAAggECZUAAAAABZkAAAAABewEAAAABfAEAAAABfQEAAAABfgEAAAABfwEAAAABgAEBAAAAAYIBCAAAAAEEFwAA-gEAMIcBAAD7AQAwiQEAAP0BACCNAQAA0wEAMAQXAADvAQAwhwEAAPABADCJAQAA8gEAII0BAADEAQAwBBcAAOABADCHAQAA4QEAMIkBAADjAQAgjQEAAOQBADAEFwAAzwEAMIcBAADQAQAwiQEAANIBACCNAQAA0wEAMAQXAADAAQAwhwEAAMEBADCJAQAAwwEAII0BAADEAQAwAAAAAAAAAAAAAAAAAAUXAACfAgAgGAAAogIAIIcBAACgAgAgiAEAAKECACCNAQAAVgAgAxcAAJ8CACCHAQAAoAIAII0BAABWACAAAAAJBQAAngIAIAYAAIwCACAJAACNAgAgXgAAsgEAIF8AALIBACB-AACyAQAgfwAAsgEAIIABAACyAQAgggEAALIBACAHAwAAiwIAIAYAAIwCACAHAACNAgAgWQAAsgEAIFoAALIBACBeAACyAQAgXwAAsgEAIBAGAACJAgAgBwAAigIAIFYBAAAAAVcBAAAAAVgBAAAAAVkBAAAAAVoBAAAAAVwAAABcAl0gAAAAAV4BAAAAAV8BAAAAAWEAAABhAmMAAABjAmQgAAAAAWVAAAAAAWZAAAAAAQIAAABWACAXAACfAgAgAwAAAFkAIBcAAJ8CACAYAACjAgAgEgAAAFkAIAYAAL4BACAHAAC_AQAgEAAAowIAIFYBALYBACFXAQC2AQAhWAEAtgEAIVkBALcBACFaAQC3AQAhXAAAuAFcIl0gALkBACFeAQC3AQAhXwEAtwEAIWEAALoBYSJjAAC7AWMiZCAAuQEAIWVAALwBACFmQAC8AQAhEAYAAL4BACAHAAC_AQAgVgEAtgEAIVcBALYBACFYAQC2AQAhWQEAtwEAIVoBALcBACFcAAC4AVwiXSAAuQEAIV4BALcBACFfAQC3AQAhYQAAugFhImMAALsBYyJkIAC5AQAhZUAAvAEAIWZAALwBACEQAwAAiAIAIAcAAIoCACBWAQAAAAFXAQAAAAFYAQAAAAFZAQAAAAFaAQAAAAFcAAAAXAJdIAAAAAFeAQAAAAFfAQAAAAFhAAAAYQJjAAAAYwJkIAAAAAFlQAAAAAFmQAAAAAECAAAAVgAgFwAApAIAIAMAAABZACAXAACkAgAgGAAAqAIAIBIAAABZACADAAC9AQAgBwAAvwEAIBAAAKgCACBWAQC2AQAhVwEAtgEAIVgBALYBACFZAQC3AQAhWgEAtwEAIVwAALgBXCJdIAC5AQAhXgEAtwEAIV8BALcBACFhAAC6AWEiYwAAuwFjImQgALkBACFlQAC8AQAhZkAAvAEAIRADAAC9AQAgBwAAvwEAIFYBALYBACFXAQC2AQAhWAEAtgEAIVkBALcBACFaAQC3AQAhXAAAuAFcIl0gALkBACFeAQC3AQAhXwEAtwEAIWEAALoBYSJjAAC7AWMiZCAAuQEAIWVAALwBACFmQAC8AQAhCFYBAAAAAWMAAAB4AmVAAAAAAWZAAAAAAXUBAAAAAXYIAAAAAXkBAAAAAXpAAAAAARADAACIAgAgBgAAiQIAIFYBAAAAAVcBAAAAAVgBAAAAAVkBAAAAAVoBAAAAAVwAAABcAl0gAAAAAV4BAAAAAV8BAAAAAWEAAABhAmMAAABjAmQgAAAAAWVAAAAAAWZAAAAAAQIAAABWACAXAACqAgAgAwAAAFkAIBcAAKoCACAYAACuAgAgEgAAAFkAIAMAAL0BACAGAAC-AQAgEAAArgIAIFYBALYBACFXAQC2AQAhWAEAtgEAIVkBALcBACFaAQC3AQAhXAAAuAFcIl0gALkBACFeAQC3AQAhXwEAtwEAIWEAALoBYSJjAAC7AWMiZCAAuQEAIWVAALwBACFmQAC8AQAhEAMAAL0BACAGAAC-AQAgVgEAtgEAIVcBALYBACFYAQC2AQAhWQEAtwEAIVoBALcBACFcAAC4AVwiXSAAuQEAIV4BALcBACFfAQC3AQAhYQAAugFhImMAALsBYyJkIAC5AQAhZUAAvAEAIWZAALwBACEFVgEAAAABYwAAAIQBAmVAAAAAAWZAAAAAAYQBAQAAAAENVgEAAAABXgEAAAABXwEAAAABYwAAAIIBAmVAAAAAAWZAAAAAAXsBAAAAAXwBAAAAAX0BAAAAAX4BAAAAAX8BAAAAAYABAQAAAAGCAQgAAAABEAUAAJkCACAJAACHAgAgVgEAAAABXgEAAAABXwEAAAABYwAAAIIBAmVAAAAAAWZAAAAAAXkBAAAAAXsBAAAAAXwBAAAAAX0BAAAAAX4BAAAAAX8BAAAAAYABAQAAAAGCAQgAAAABAgAAAAUAIBcAALECACADAAAAAwAgFwAAsQIAIBgAALUCACASAAAAAwAgBQAAmAIAIAkAAO4BACAQAAC1AgAgVgEAtgEAIV4BALcBACFfAQC3AQAhYwAA6gGCASJlQAC8AQAhZkAAvAEAIXkBALYBACF7AQC2AQAhfAEAtgEAIX0BALYBACF-AQC3AQAhfwEAtwEAIYABAQC3AQAhggEIAOsBACEQBQAAmAIAIAkAAO4BACBWAQC2AQAhXgEAtwEAIV8BALcBACFjAADqAYIBImVAALwBACFmQAC8AQAheQEAtgEAIXsBALYBACF8AQC2AQAhfQEAtgEAIX4BALcBACF_AQC3AQAhgAEBALcBACGCAQgA6wEAIQhWAQAAAAFjAAAAeAJlQAAAAAFmQAAAAAF1AQAAAAF2CAAAAAF4AQAAAAF6QAAAAAEQBQAAmQIAIAYAAIYCACBWAQAAAAFeAQAAAAFfAQAAAAFjAAAAggECZUAAAAABZkAAAAABeQEAAAABewEAAAABfAEAAAABfQEAAAABfgEAAAABfwEAAAABgAEBAAAAAYIBCAAAAAECAAAABQAgFwAAtwIAIAMAAAADACAXAAC3AgAgGAAAuwIAIBIAAAADACAFAACYAgAgBgAA7QEAIBAAALsCACBWAQC2AQAhXgEAtwEAIV8BALcBACFjAADqAYIBImVAALwBACFmQAC8AQAheQEAtgEAIXsBALYBACF8AQC2AQAhfQEAtgEAIX4BALcBACF_AQC3AQAhgAEBALcBACGCAQgA6wEAIRAFAACYAgAgBgAA7QEAIFYBALYBACFeAQC3AQAhXwEAtwEAIWMAAOoBggEiZUAAvAEAIWZAALwBACF5AQC2AQAhewEAtgEAIXwBALYBACF9AQC2AQAhfgEAtwEAIX8BALcBACGAAQEAtwEAIYIBCADrAQAhBVYBAAAAAWMAAACEAQJlQAAAAAFmQAAAAAF4AQAAAAECBAACCgADBAUAAwYRBAgABgkSAQQDBgIGCgQHDQEIAAUCBAACBQADAwMOAAYPAAcQAAIGEwAJFAAAAgQAAgoAAwIEAAIKAAMDCAALHQAMHgANAAAAAwgACx0ADB4ADQEFAAMBBQADBQgAEh0AFR4AFi8AEzAAFAAAAAAABQgAEh0AFR4AFi8AEzAAFAIEAAIFAAMCBAACBQADBQgAGx0AHh4AHy8AHDAAHQAAAAAABQgAGx0AHh4AHy8AHDAAHQAAAwgAJB0AJR4AJgAAAAMIACQdACUeACYLAgEMFQENFgEOFwEPGAERGgESHAcTHQgUHwEVIQcWIgkZIwEaJAEbJQcfKAogKQ4hKgIiKwIjLAIkLQIlLgImMAInMgcoMw8pNQIqNwcrOBAsOQItOgIuOwcxPhEyPxczQAQ0QQQ1QgQ2QwQ3RAQ4RgQ5SAc6SRg7SwQ8TQc9Thk-TwQ_UARAUQdBVBpCVSBDVwNEWANFWwNGXANHXQNIXwNJYQdKYiFLZANMZgdNZyJOaANPaQNQagdRbSNSbic"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  AssignScalarFieldEnum: () => AssignScalarFieldEnum,
  ComplainScalarFieldEnum: () => ComplainScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.0",
  engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Assign: "Assign",
  Complain: "Complain",
  Payment: "Payment",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AssignScalarFieldEnum = {
  id: "id",
  status: "status",
  complainId: "complainId",
  serviceWorkerId: "serviceWorkerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ComplainScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  location: "location",
  imageUrl: "imageUrl",
  imagePublicId: "imagePublicId",
  proofImageUrl: "proofImageUrl",
  proofImagePublicId: "proofImagePublicId",
  proofDescription: "proofDescription",
  status: "status",
  price: "price",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  transactionId: "transactionId",
  amount: "amount",
  status: "status",
  complainId: "complainId",
  userId: "userId",
  paidAt: "paidAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  googleId: "googleId",
  authProvider: "authProvider",
  emailVerified: "emailVerified",
  imagePublicId: "imagePublicId",
  imageUrl: "imageUrl",
  role: "role",
  status: "status",
  needPasswordChange: "needPasswordChange",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/lib/redis.ts
import { createClient } from "redis";

// src/app/config/index.ts
import dotenv from "dotenv";
import path2 from "path";
dotenv.config({ path: path2.join(process.cwd(), ".env") });
var config_default = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  app_url: process.env.APP_URL,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  redis_user: process.env.REDIS_USER,
  redis_password: process.env.REDIS_PASSWORD,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  email_sender: process.env.EMAIL_SENDER,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_cloud_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_cloud_secret: process.env.CLOUDINARY_API_SECRET,
  ssl_commerz_store_id: process.env.SSL_COMMERZ_STORE_ID,
  ssl_commerz_store_password: process.env.SSL_COMMERZ_STORE_PASSWORD
};

// src/app/lib/redis.ts
var redisClient = createClient({
  username: config_default.redis_user,
  password: config_default.redis_password,
  socket: {
    host: config_default.redis_host,
    port: Number(config_default.redis_port)
  }
});

// src/app/module/auth/auth.service.ts
import crypto from "crypto";
import path3 from "path";
import ejs from "ejs";

// src/app/lib/nodemailer.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config_default.smtp_user,
    pass: config_default.smtp_password
  }
});

// src/app/module/auth/auth.service.ts
import httpStatus from "http-status";

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, {
    expiresIn
  });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/app/module/auth/auth.service.ts
var registerUser = async (payload) => {
  const { name, password } = payload;
  const email = payload?.email?.trim()?.toLowerCase();
  const isUserExists = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User with this email already exists"
    );
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const expirationSeconds = 5 * 60;
  const otpKey = `user-registration-otp:${email}`;
  const otpValue = crypto.randomInt(1e5, 1e6).toString();
  await redisClient.set(otpKey, otpValue, {
    expiration: {
      type: "EX",
      value: expirationSeconds
    }
  });
  const userRegistrationKey = `user-registration-data:${email}`;
  const redisUserDataPayload = {
    name,
    email,
    password: hashedPassword
  };
  await redisClient.set(
    userRegistrationKey,
    JSON.stringify(redisUserDataPayload),
    {
      expiration: {
        type: "EX",
        value: expirationSeconds
      }
    }
  );
  const templatePath = path3.join(
    process.cwd(),
    "src/app/templates/registration-user-otp.ejs"
  );
  const expirationMinutes = 5 * 60;
  const templateData = {
    name,
    email,
    otp: otpValue,
    expirationMinutes: expirationMinutes / 60
  };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: email,
    subject: "Email Verification",
    // text: `Your OTP is: ${otp}`,
    // html: `<h1>Your OTP is: ${otp}</h1>`,
    html
  });
};
var verifyUserEmail = async (payload) => {
  const otp = payload.otp;
  const email = payload.email.trim().toLowerCase();
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExist?.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "User is Blocked");
  }
  if (isUserExist?.emailVerified) {
    throw new AppError(httpStatus.CONFLICT, "Email Already Verify");
  }
  const otpKey = `user-registration-otp:${email}`;
  const redisOtp = await redisClient.get(otpKey);
  if (!redisOtp) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid OTP");
  }
  if (redisOtp !== otp) {
    throw new AppError(httpStatus.BAD_REQUEST, "OTP Does Not Match");
  }
  await redisClient.del(otpKey);
  const userRegistrationKey = `user-registration-data:${email}`;
  const redisuserData = await redisClient.get(userRegistrationKey);
  if (!redisuserData) {
    throw new AppError(httpStatus.NOT_FOUND, "User Does Not Exist");
  }
  const userPayload = JSON.parse(redisuserData);
  const createdUser = await prisma.user.create({
    data: {
      name: userPayload.name,
      email: userPayload.email,
      password: userPayload.password,
      role: Role.CITIZEN,
      status: UserStatus.ACTIVE,
      emailVerified: true
    }
  });
  await redisClient.del(userRegistrationKey);
  const templatePath = path3.join(
    process.cwd(),
    "src/app/templates/user-welcome-email.ejs"
  );
  const templateData = {
    name: createdUser.name
  };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: email,
    subject: "Welcome To City Complain & Service Platform",
    html
  });
  const { ...user } = createdUser;
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    user,
    accessToken,
    refreshToken: refreshToken3
  };
};
var loginUser = async (payload) => {
  const { password } = payload;
  const email = payload?.email?.trim()?.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  if (user?.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "User is Blocked");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password Does Not Match");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var getMe = async (user) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user?.userId
    },
    omit: {
      password: true
    }
  });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  return isUserExists;
};
var refreshToken = async (token) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    token,
    config_default.jwt_refresh_secret
  );
  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      config_default.node_env === "development" ? verifiedRefreshToken.error : "Invalid refresh token"
    );
  }
  const data = verifiedRefreshToken.data;
  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  if (!user || user.status !== UserStatus.ACTIVE) {
    throw new Error("User is inactive or not found");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var forgotPassword = async (payload) => {
  const { email } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Does Not Exist!");
  }
  if (isUserExist.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "User is Blocked");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Verified");
  }
  const otp = crypto.randomInt(1e5, 1e6).toString();
  const key = `forgot-password-otp:${isUserExist.email}`;
  await redisClient.set(key, otp, {
    expiration: {
      type: "EX",
      value: 5 * 60
    }
  });
  const templatePath = path3.join(
    process.cwd(),
    "src/app/templates/forgot-password.ejs"
  );
  const expirationMinutes = 5 * 60;
  const templateData = {
    name: isUserExist?.name,
    otp,
    expirationMinutes: expirationMinutes / 60
  };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: isUserExist.email,
    subject: "Forgot Password",
    html
  });
};
var resetPassword = async (payload) => {
  const { email, otp, newPassword } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Does Not Exist!");
  }
  if (isUserExist.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "User is Blocked");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Verified");
  }
  const key = `forgot-password-otp:${isUserExist.email}`;
  const redisOtp = await redisClient.get(key);
  if (!redisOtp) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid OTP");
  }
  if (redisOtp !== otp) {
    throw new AppError(httpStatus.BAD_REQUEST, "OTP Does Not match");
  }
  const hashedNewPassword = await bcrypt.hash(
    newPassword,
    Number(config_default.bcrypt_salt_rounds)
  );
  await prisma.user.update({
    where: {
      email: isUserExist.email
    },
    data: {
      password: hashedNewPassword
    }
  });
  await redisClient.del([key]);
  const templatePath = path3.join(
    process.cwd(),
    "src/app/templates/reset-password-success.ejs"
  );
  const templateData = { name: isUserExist?.name };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: isUserExist.email,
    subject: "Password Change",
    html
  });
};
var AuthService = {
  registerUser,
  verifyUserEmail,
  loginUser,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword
};

// src/app/module/auth/auth.controller.ts
import httpStatus2 from "http-status";
var registerUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.registerUser(payload);
  sendResponse(res, {
    statusCode: httpStatus2.CREATED,
    success: true,
    message: "Verification OTP Sent",
    data: null
  });
});
var verifyUserEmail2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.verifyUserEmail(payload);
  const { accessToken, refreshToken: refreshToken3, user } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus2.CREATED,
    success: true,
    message: "Email Verified Successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3,
      user
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus2.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var getMe2 = catchAsync(async (req, res) => {
  const user = req?.user;
  if (!user) {
    throw new Error("User information is missing in the request");
  }
  const result = await AuthService.getMe(user);
  sendResponse(res, {
    statusCode: httpStatus2.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var refreshToken2 = catchAsync(async (req, res) => {
  if (!req.cookies.refreshToken) {
    throw new AppError(httpStatus2.NOT_FOUND, "Refresh token is missing");
  }
  const result = await AuthService.refreshToken(req.cookies.refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus2.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken
    }
  });
});
var forgotPassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.forgotPassword(payload);
  sendResponse(res, {
    statusCode: httpStatus2.OK,
    success: true,
    message: `OTP Send To Email : ${payload.email}`,
    data: null
  });
});
var resetPassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.resetPassword(payload);
  sendResponse(res, {
    statusCode: httpStatus2.OK,
    success: true,
    message: `Password Change Successfully`,
    data: null
  });
});
var AuthController = {
  registerUser: registerUser2,
  verifyUserEmail: verifyUserEmail2,
  loginUser: loginUser2,
  getMe: getMe2,
  refreshToken: refreshToken2,
  forgotPassword: forgotPassword2,
  resetPassword: resetPassword2
};

// src/app/middleware/validateRequest.ts
import "zod";
var validateRequest = (zodSchema) => {
  return catchAsync((req, res, next) => {
    let payload = req.body ?? {};
    if (typeof payload.data === "string") {
      payload = JSON.parse(payload.data);
    }
    const result = zodSchema.safeParse(payload);
    if (!result.success) {
      console.log("Validation errors:", result.error.issues);
      throw new Error(result.error.issues[0]?.message);
    }
    req.body = result.data;
    next();
  });
};

// src/app/module/auth/auth.validation.ts
import z2 from "zod";
var UserRegistrationZodSchema = z2.object({
  name: z2.string("Not A String!!!").min(3, "Name must be atleast 3 characters").max(10),
  email: z2.email("Not email"),
  password: z2.string().min(6, "Password Must Minimum 6 Characters").regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter").regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter").regex(/[0-9]/, "Password must contain atleast 1 Number").regex(
    /[^A-Za-z0-9]/,
    "Password must contain atleast 1 Special Characters"
  )
});
var UserEmailVerifyZodSchema = z2.object({
  email: z2.email("Not email"),
  otp: z2.string().length(6)
});
var LoginZodSchema = z2.object({
  email: z2.email(),
  password: z2.string().min(8, "Password Must Minimum 8 Characters").regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter").regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter").regex(/[0-9]/, "Password must contain atleast 1 Number").regex(
    /[^A-Za-z0-9]/,
    "Password must contain atleast 1 Special Characters"
  )
});
var ForgotPasswordZodSchema = z2.object({
  email: z2.email()
});
var ResetPasswordZodSchema = z2.object({
  email: z2.email(),
  newPassword: z2.string().min(8, "Password Must Minimum 8 Characters").regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter").regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter").regex(/[0-9]/, "Password must contain atleast 1 Number").regex(
    /[^A-Za-z0-9]/,
    "Password must contain atleast 1 Special Characters"
  ),
  otp: z2.string().length(6)
});
var UserValidation = {
  UserRegistrationZodSchema,
  UserEmailVerifyZodSchema,
  LoginZodSchema,
  ForgotPasswordZodSchema,
  ResetPasswordZodSchema
};

// src/app/middleware/checkAuth.ts
import httpStatus3 from "http-status";
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new Error(
        "You are not logged in. Please log in to access this resource."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }
    const { email, name, userId, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource."
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new AppError(
        httpStatus3.NOT_FOUND,
        "User not found. Please log in again."
      );
    }
    if (user.status === "BLOCKED") {
      throw new Error("Your account has been blocked. Please contact support.");
    }
    req.user = {
      email,
      name,
      userId,
      role
    };
    next();
  });
};

// src/app/module/auth/auth.route.ts
var router = Router();
router.post(
  "/register",
  validateRequest(UserValidation.UserRegistrationZodSchema),
  AuthController.registerUser
);
router.post(
  "/verify-email",
  validateRequest(UserValidation.UserEmailVerifyZodSchema),
  AuthController.verifyUserEmail
);
router.post(
  "/login",
  validateRequest(UserValidation.LoginZodSchema),
  AuthController.loginUser
);
router.get(
  "/me",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CITIZEN),
  AuthController.getMe
);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/forgot-password",
  validateRequest(UserValidation.ForgotPasswordZodSchema),
  AuthController.forgotPassword
);
router.post(
  "/reset-password",
  validateRequest(UserValidation.ResetPasswordZodSchema),
  AuthController.resetPassword
);
var AuthRoutes = router;

// src/app/middleware/globalErrorHandler.ts
import httpStatus4 from "http-status";
var globalErrorHandler = async (err, _req, res, _next) => {
  let statusCode = httpStatus4.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  const errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus4.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus4.BAD_REQUEST, errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus4.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = httpStatus4.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus4.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check Your Credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus4.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus4.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof AppError) {
    errorMessage = err.message, statusCode = err.statusCode;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode || httpStatus4.INTERNAL_SERVER_ERROR,
    name: config_default.node_env === "development" ? errorName : "Internal Server Error",
    message: config_default.node_env === "development" ? errorMessage : "Internal Server Error",
    error: config_default.node_env === "development" ? err : void 0,
    stack: config_default.node_env === "development" ? err.stack : void 0
  });
};

// src/app/middleware/notFound.ts
import httpStatus5 from "http-status";
var notFound = (req, res) => {
  res.status(httpStatus5.NOT_FOUND).json({
    message: "Route not found",
    path: req.originalUrl,
    date: /* @__PURE__ */ new Date()
  });
};

// src/app.ts
import httpStatus14 from "http-status";
import cors from "cors";
import cookieParser from "cookie-parser";

// src/app/module/user/user.route.ts
import { Router as Router2 } from "express";

// src/app/module/user/user.controller.ts
import httpStatus7 from "http-status";

// src/app/lib/cloudinary.ts
import { v2 as Cloudinary } from "cloudinary";
Cloudinary.config({
  cloud_name: config_default.cloudinary_cloud_name,
  api_key: config_default.cloudinary_cloud_key,
  api_secret: config_default.cloudinary_cloud_secret
});
var cloudinary = Cloudinary;

// src/app/module/user/user.service.ts
import httpStatus6 from "http-status";
var uploadProfileImage = async (buffer, userId) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
    // select: {
    //   imagePublicId: true,
    //   imageUrl: true,
    // },
  });
  const cloudinaryResult = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto"
        },
        async (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error("No Result returned from Cloudinary"));
          }
          resolve(result);
        }
      ).end(buffer);
    }
  );
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      imageUrl: cloudinaryResult?.secure_url,
      imagePublicId: cloudinaryResult?.public_id
    },
    omit: {
      password: true
    }
  });
  if (currentUser?.imagePublicId && currentUser?.imageUrl) {
    await cloudinary.uploader.destroy(currentUser.imagePublicId);
  }
  return updatedUser;
};
var getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true
    }
  });
  return users;
};
var updateUserRole = async (userId, role) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new AppError(httpStatus6.NOT_FOUND, "User not found");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role
    },
    omit: {
      password: true
    }
  });
  return updatedUser;
};
var UserService = {
  getAllUsers,
  uploadProfileImage,
  updateUserRole
};

// src/app/module/user/user.controller.ts
var uploadProfileImage2 = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new Error("No File Provided.");
  }
  const userId = req.user?.userId;
  const result = await UserService.uploadProfileImage(
    req?.file?.buffer,
    userId
  );
  sendResponse(res, {
    statusCode: httpStatus7.CREATED,
    success: true,
    message: "Profile Picture Uploaded Successfully",
    data: result
  });
});
var getAllUsers2 = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus7.CREATED,
    success: true,
    message: "User Retrieved Successfully",
    data: result
  });
});
var updateUserRole2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserService.updateUserRole(id, role);
  sendResponse(res, {
    statusCode: httpStatus7.CREATED,
    success: true,
    message: "User Role Updated Successfully",
    data: result
  });
});
var UserController = {
  uploadProfileImage: uploadProfileImage2,
  getAllUsers: getAllUsers2,
  updateUserRole: updateUserRole2
};

// src/app/lib/multer.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({ storage });

// src/app/module/user/user.route.ts
var router2 = Router2();
router2.patch(
  "/profile-image",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CITIZEN),
  upload.single("profileImage"),
  UserController.uploadProfileImage
);
router2.get("/", auth(Role.SUPER_ADMIN, Role.ADMIN), UserController.getAllUsers);
router2.patch("/:id", auth(Role.SUPER_ADMIN), UserController.updateUserRole);
var UserRoutes = router2;

// src/app/module/complain/complain.route.ts
import { Router as Router3 } from "express";

// src/app/module/complain/complain.validation.ts
import { z as z3 } from "zod";
var CreateComplainValidationSchema = z3.object({
  title: z3.string(),
  description: z3.string(),
  location: z3.string(),
  price: z3.number()
});
var UpdateComplainValidationSchema = z3.object({
  title: z3.string().optional(),
  description: z3.string().optional(),
  location: z3.string().optional(),
  price: z3.number().optional(),
  status: z3.enum(["PENDING", "APPROVED", "REJECTED"]).optional()
});
var completeWorkValidationSchema = z3.object({
  proofDescription: z3.string().min(1, "Proof description is required")
});
var complainValidation = {
  CreateComplainValidationSchema,
  UpdateComplainValidationSchema,
  completeWorkValidationSchema
};

// src/app/module/complain/complain.controller.ts
import httpStatus9 from "http-status";

// src/app/module/complain/complain.service.ts
import httpStatus8 from "http-status";
var createComplain = async (payload, userId, image) => {
  let imageUrl = "";
  let imagePublicId = "";
  if (image) {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image"
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error("No result returned from Cloudinary"));
          }
          resolve(result);
        }
      ).end(image.buffer);
    });
    imageUrl = uploadResult.secure_url;
    imagePublicId = uploadResult.public_id;
  }
  const complain = await prisma.complain.create({
    data: {
      ...payload,
      userId,
      imageUrl,
      imagePublicId
    }
  });
  return complain;
};
var citezenOwnComplain = async (userId) => {
  const complains = await prisma.complain.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  return complains;
};
var getSingleComplain = async (id) => {
  const complain = await prisma.complain.findUnique({
    where: {
      id
    },
    include: {
      user: {
        omit: {
          password: true
        }
      }
    }
  });
  return complain;
};
var updateComplain = async (id, userId, payload) => {
  const complain = await prisma.complain.findFirst({
    where: {
      id,
      userId
    }
  });
  if (!complain) {
    throw new AppError(404, "Complain not found or you are not authorized");
  }
  const updatedComplain = await prisma.complain.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return updatedComplain;
};
var deleteComplain = async (id) => {
  const result = await prisma.complain.delete({
    where: { id }
  });
  return result;
};
var adminGetAllComplains = async (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: query.searchTerm, mode: "insensitive" } },
        { location: { contains: query.searchTerm, mode: "insensitive" } }
      ]
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status.toUpperCase()
    });
  }
  if (query.minPrice || query.maxPrice) {
    andConditions.push({
      price: {
        ...query.minPrice && {
          gte: Number(query.minPrice)
        },
        ...query.maxPrice && {
          lte: Number(query.maxPrice)
        }
      }
    });
  }
  const result = await prisma.complain.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  return result;
};
var adminUpdateComplainStatus = async (complainId, status) => {
  const complain = await prisma.complain.findUnique({
    where: {
      id: complainId
    }
  });
  if (!complain) {
    throw new AppError(httpStatus8.NOT_FOUND, "Complain not found");
  }
  const result = await prisma.complain.update({
    where: {
      id: complainId
    },
    data: {
      status
    }
  });
  return result;
};
var ComplainService = {
  createComplain,
  citezenOwnComplain,
  updateComplain,
  getSingleComplain,
  deleteComplain,
  adminGetAllComplains,
  adminUpdateComplainStatus
};

// src/app/module/complain/complain.controller.ts
var createComplain2 = catchAsync(async (req, res) => {
  const image = req.file || null;
  const payload = req.body;
  const result = await ComplainService.createComplain(
    payload,
    req?.user?.userId,
    image
  );
  sendResponse(res, {
    statusCode: httpStatus9.CREATED,
    success: true,
    message: "Complain Created Successfully",
    data: result
  });
});
var getMyComplains = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  const result = await ComplainService.citezenOwnComplain(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Complain retrieved successfully",
    data: result
  });
});
var updateComplain2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req?.user?.userId;
  const result = await ComplainService.updateComplain(
    id,
    userId,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Complain updated successfully",
    data: result
  });
});
var getSingleComplain2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ComplainService.getSingleComplain(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus9.OK,
    message: "Complain retrieved successfully",
    data: result
  });
});
var deleteComplain2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ComplainService.deleteComplain(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus9.OK,
    message: "Complain deleted successfully",
    data: null
  });
});
var adminGetAllComplains2 = catchAsync(async (req, res) => {
  const result = await ComplainService.adminGetAllComplains(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin retrieved complain successfully",
    data: result
  });
});
var adminUpdateComplainStatus2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await ComplainService.adminUpdateComplainStatus(
    id,
    status
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus9.OK,
    message: "Complain status updated successfully",
    data: result
  });
});
var ComplainController = {
  createComplain: createComplain2,
  getMyComplains,
  updateComplain: updateComplain2,
  getSingleComplain: getSingleComplain2,
  deleteComplain: deleteComplain2,
  adminGetAllComplains: adminGetAllComplains2,
  adminUpdateComplainStatus: adminUpdateComplainStatus2
};

// src/app/module/complain/complain.route.ts
var router3 = Router3();
router3.post(
  "/create-complain",
  auth(Role.CITIZEN),
  upload.single("image"),
  validateRequest(complainValidation.CreateComplainValidationSchema),
  ComplainController.createComplain
);
router3.get(
  "/my-complains",
  auth(Role.CITIZEN),
  ComplainController.getMyComplains
);
router3.get(
  "/admin-get-all-complains",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  ComplainController.adminGetAllComplains
);
router3.get("/:id", ComplainController.getSingleComplain);
router3.patch(
  "/:id",
  auth(Role.CITIZEN),
  validateRequest(complainValidation.UpdateComplainValidationSchema),
  ComplainController.updateComplain
);
router3.delete("/:id", ComplainController.deleteComplain);
router3.patch(
  "/admin-update-status/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  ComplainController.adminUpdateComplainStatus
);
var ComplainRoutes = router3;

// src/app/module/payment/payment.route.ts
import express from "express";

// src/app/module/payment/payment.service.ts
import axios from "axios";
import httpStatus10 from "http-status";
var initiateComplainPayment = async (complainId, userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    }
  });
  const complain = await prisma.complain.findUniqueOrThrow({
    where: {
      id: complainId
    }
  });
  console.log(complain);
  if (complain.userId !== userId) {
    throw new AppError(
      httpStatus10.FORBIDDEN,
      "You can only pay for your own complain."
    );
  }
  if (complain.status !== "APPROVED") {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
      "Your complain is not approved yet. You can not payment."
    );
  }
  if (!complain.price || complain.price <= 0) {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
      "This complain does not require payment."
    );
  }
  const tranId = `COMPLAIN_TRNX_${Date.now()}`;
  const paymentData = {
    store_id: config_default.ssl_commerz_store_id,
    store_passwd: config_default.ssl_commerz_store_password,
    total_amount: complain.price,
    currency: "BDT",
    tran_id: tranId,
    success_url: `${config_default.app_url}/api/v1/payments/complain-confirm?complainId=${complainId}&tranId=${tranId}&status=success`,
    fail_url: `${config_default.app_url}/api/v1/payments/complain-confirm?complainId=${complainId}&tranId=${tranId}&status=fail`,
    cancel_url: `${config_default.app_url}/api/v1/payments/complain-confirm?complainId=${complainId}&tranId=${tranId}&status=cancel`,
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "Rajshahi",
    cus_state: "Rajshahi",
    cus_postcode: 6e3,
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111"
  };
  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    paymentData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  const data = response.data;
  await prisma.payment.create({
    data: {
      transactionId: tranId,
      complainId,
      userId,
      amount: complain.price,
      status: "PENDING"
    }
  });
  return data?.GatewayPageURL;
};
var validatePayment = async (complainId, tranId, status, payload) => {
  const response = await axios.post(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${payload.val_id}&store_id=${config_default.ssl_commerz_store_id}&store_passwd=${config_default.ssl_commerz_store_password}&format=json`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  const data = await response.data;
  if (data.status === "VALID") {
    await prisma.complain.update({
      where: {
        id: complainId
      },
      data: {
        status: "APPROVED"
      }
    });
    await prisma.payment.update({
      where: {
        transactionId: tranId
      },
      data: {
        status: "COMPLETED",
        paidAt: /* @__PURE__ */ new Date()
      }
    });
  }
  return status;
};
var getUserPayments = async (userId) => {
  const result = await prisma.payment.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  return result;
};
var getAllPayments = async () => {
  const result = await prisma.payment.findMany({
    orderBy: {
      createdAt: "asc"
    }
  });
  return result;
};
var paymentService = {
  initiateComplainPayment,
  validatePayment,
  getUserPayments,
  getAllPayments
};

// src/app/module/payment/payment.controller.ts
import httpStatus11 from "http-status";
var initiatePayment = catchAsync(async (req, res) => {
  const { payment } = req?.body;
  const userId = req.user?.userId;
  const paymentUrl = await paymentService.initiateComplainPayment(
    payment,
    userId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus11.CREATED,
    message: "Payment initiated successfully",
    data: {
      paymentUrl
    }
  });
});
var verifyPayment = catchAsync(async (req, res) => {
  const { complainId, tranId, status } = req.query;
  const payload = req.body;
  const result = await paymentService.validatePayment(
    complainId,
    tranId,
    status,
    payload
  );
  if (result === "success") {
    res.redirect(
      `http://localhost:3000/tenant-dashboard/payment-success/${tranId}`
    );
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus11.CREATED,
    message: "Payment verified successfully",
    data: result
  });
});
var getUserPayments2 = catchAsync(async (req, res) => {
  const userId = req.body?.userId;
  const result = await paymentService.getUserPayments(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus11.OK,
    message: "User payments retrieved successfully",
    data: result
  });
});
var getAllPayments2 = catchAsync(async (req, res) => {
  const result = await paymentService.getAllPayments();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus11.OK,
    message: "All payments retrieved successfully",
    data: result
  });
});
var paymentController = {
  initiatePayment,
  verifyPayment,
  getUserPayments: getUserPayments2,
  getAllPayments: getAllPayments2
};

// src/app/module/payment/payment.route.ts
var router4 = express.Router();
router4.post(
  "/create-payment",
  auth(Role.CITIZEN),
  paymentController.initiatePayment
);
router4.post("/complain-confirm", paymentController.verifyPayment);
router4.get(
  "/user-payments",
  auth(Role.CITIZEN),
  paymentController.getUserPayments
);
router4.get(
  "/get-all-payments",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  paymentController.getAllPayments
);
var PaymentRoutes = router4;

// src/app/module/assign/assign.route.ts
import { Router as Router4 } from "express";

// src/app/module/assign/assign.controller.ts
import httpStatus13 from "http-status";

// src/app/module/assign/assign.service.ts
import httpStatus12 from "http-status";

// src/app/utils/sendImageToCloudinary.ts
var sendImageToCloudinary = async (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

// src/app/module/assign/assign.service.ts
var assignServiceWorker = async (complainId, serviceWorkerId) => {
  const complain = await prisma.complain.findUnique({
    where: {
      id: complainId
    }
  });
  if (!complain) {
    throw new AppError(httpStatus12.NOT_FOUND, "Complain not found");
  }
  const serviceWorker = await prisma.user.findUnique({
    where: {
      id: serviceWorkerId
    }
  });
  if (!serviceWorker) {
    throw new AppError(httpStatus12.NOT_FOUND, "Service worker not found");
  }
  if (serviceWorker.role !== "SERVICE_WORKER") {
    throw new AppError(
      httpStatus12.BAD_REQUEST,
      "Selected user is not a service worker"
    );
  }
  const existingAssign = await prisma.assign.findFirst({
    where: {
      complainId
    }
  });
  if (existingAssign) {
    throw new AppError(
      httpStatus12.BAD_REQUEST,
      "This complain is already assigned"
    );
  }
  const result = await prisma.assign.create({
    data: {
      complainId,
      serviceWorkerId
    },
    include: {
      complain: true,
      serviceWorker: {
        omit: {
          password: true
        }
      }
    }
  });
  return result;
};
var getMyAssignments = async (serviceWorkerId) => {
  const result = await prisma.assign.findMany({
    where: {
      serviceWorkerId
    },
    include: {
      complain: true,
      serviceWorker: {
        omit: {
          password: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    omit: {
      serviceWorkerId: true,
      complainId: true
    }
  });
  return result;
};
var startWork = async (assignId, serviceWorkerId, status) => {
  const assignment = await prisma.assign.findFirst({
    where: {
      id: assignId,
      serviceWorkerId
    }
  });
  if (!assignment) {
    throw new AppError(
      httpStatus12.NOT_FOUND,
      "Assign not found or you are not assigned to this complain"
    );
  }
  if (assignment.status === "PENDING" && status === "IN_PROGRESS") {
    const result = await prisma.assign.update({
      where: {
        id: assignId
      },
      data: {
        status: "IN_PROGRESS"
      },
      include: {
        complain: true
      }
    });
    return result;
  }
  if (status === "COMPLETED") {
    throw new AppError(
      httpStatus12.BAD_REQUEST,
      "You cannot complete the work here. Submit proof to complete the work."
    );
  }
  throw new AppError(
    httpStatus12.BAD_REQUEST,
    `Cannot change status from ${assignment.status} to ${status}`
  );
};
var completeWork = async (assignId, serviceWorkerId, proofDescription, proofImage) => {
  const assignment = await prisma.assign.findFirst({
    where: {
      id: assignId,
      serviceWorkerId
    }
  });
  if (!assignment) {
    throw new AppError(
      httpStatus12.NOT_FOUND,
      "Assign not found or you are not assigned to this complain"
    );
  }
  if (assignment.status !== "IN_PROGRESS") {
    throw new AppError(
      httpStatus12.BAD_REQUEST,
      "You must start the work before submitting proof"
    );
  }
  if (!proofImage) {
    throw new AppError(httpStatus12.BAD_REQUEST, "Proof image is required");
  }
  const uploadedImage = await sendImageToCloudinary(
    proofImage.buffer,
    "citycare/complain-proofs"
  );
  const result = await prisma.$transaction(async (tx) => {
    const complain = await tx.complain.update({
      where: {
        id: assignment.complainId
      },
      data: {
        proofImageUrl: uploadedImage.secure_url,
        proofImagePublicId: uploadedImage.public_id,
        proofDescription
      }
    });
    const assign = await tx.assign.update({
      where: {
        id: assignId
      },
      data: {
        status: "COMPLETED"
      }
    });
    return {
      assign,
      complain
    };
  });
  return result;
};
var citizenSeeComplainWorkStatus = async (citizenId) => {
  const result = await prisma.assign.findMany({
    where: {
      complain: {
        userId: citizenId
      }
    },
    include: {
      complain: true,
      serviceWorker: {
        omit: {
          password: true
        }
      }
    },
    omit: {
      complainId: true,
      serviceWorkerId: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var AssignService = {
  assignServiceWorker,
  getMyAssignments,
  startWork,
  completeWork,
  citizenSeeComplainWorkStatus
};

// src/app/module/assign/assign.controller.ts
var assignServiceWorker2 = catchAsync(async (req, res) => {
  const { complainId, serviceWorkerId } = req.body;
  const result = await AssignService.assignServiceWorker(
    complainId,
    serviceWorkerId
  );
  sendResponse(res, {
    statusCode: httpStatus13.OK,
    success: true,
    message: "Service worker assigned successfully",
    data: result
  });
});
var getMyAssignments2 = catchAsync(async (req, res) => {
  const serviceWorkerId = req.user?.userId;
  const result = await AssignService.getMyAssignments(
    serviceWorkerId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Assigned complains retrieved successfully",
    data: result
  });
});
var startWork2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const serviceWorkerId = req.user?.userId;
  const result = await AssignService.startWork(
    id,
    serviceWorkerId,
    status
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Work started successfully",
    data: result
  });
});
var completeWork2 = catchAsync(async (req, res) => {
  const { assignId } = req.params;
  const serviceWorkerId = req.user?.userId;
  const { proofDescription } = req.body;
  const result = await AssignService.completeWork(
    assignId,
    serviceWorkerId,
    proofDescription,
    req.file
  );
  sendResponse(res, {
    statusCode: httpStatus13.OK,
    success: true,
    message: "Work completed and proof submitted successfully",
    data: result
  });
});
var citizenSeeComplainWorkStatus2 = catchAsync(async (req, res) => {
  const citizenId = req.user?.userId;
  const result = await AssignService.citizenSeeComplainWorkStatus(
    citizenId
  );
  sendResponse(res, {
    statusCode: httpStatus13.OK,
    success: true,
    message: "Citizen complain work status retrieved successfully",
    data: result
  });
});
var AssignController = {
  assignServiceWorker: assignServiceWorker2,
  getMyAssignments: getMyAssignments2,
  startWork: startWork2,
  completeWork: completeWork2,
  citizenSeeComplainWorkStatus: citizenSeeComplainWorkStatus2
};

// src/app/module/assign/assign.validation.ts
import z4 from "zod";
var createAssignValidation = z4.object({
  complainId: z4.string(),
  serviceWorkerId: z4.string()
});
var updateAssginValidation = z4.object({
  status: z4.string()
});
var assignValidation = {
  createAssignValidation,
  updateAssginValidation
};

// src/app/module/assign/assign.route.ts
var router5 = Router4();
router5.post(
  "/assign-service-worker",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(assignValidation.createAssignValidation),
  AssignController.assignServiceWorker
);
router5.get(
  "/service-wroker-assign",
  auth(Role.SERVICE_WORKER),
  AssignController.getMyAssignments
);
router5.patch(
  "/:id",
  auth(Role.SERVICE_WORKER),
  validateRequest(assignValidation.updateAssginValidation),
  AssignController.startWork
);
router5.patch(
  "/:assignId/complete-work",
  auth(Role.SERVICE_WORKER),
  upload.single("proofImage"),
  validateRequest(complainValidation.completeWorkValidationSchema),
  AssignController.completeWork
);
router5.get(
  "/citizen-complain-status",
  auth(Role.CITIZEN),
  AssignController.citizenSeeComplainWorkStatus
);
var AssignRoutes = router5;

// src/app.ts
var app = express2();
app.use(
  cors({
    origin: config_default.frontend_url,
    credentials: true
  })
);
app.use(express2.json());
app.use(cookieParser());
app.use(express2.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/complains", ComplainRoutes);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/v1/assigns", AssignRoutes);
app.get("/", async (req, res) => {
  res.status(httpStatus14.OK).json({
    success: true,
    message: "Welcome to City Complain & Service Platform"
  });
});
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/app/utils/seed.ts
import bcrypt2 from "bcryptjs";
import httpstatus from "http-status";
var seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN
      }
    });
    if (isSuperAdminExist) {
      throw new AppError(httpstatus.CONFLICT, "Super Admin already exists");
    }
    const name = config_default.super_admin_name;
    const email = config_default.super_admin_email;
    const password = config_default.super_admin_password;
    if (!name || !email || !password) {
      throw new AppError(
        httpstatus.NOT_FOUND,
        "Super Admin Name , Email, Password is Missing."
      );
    }
    const hashedPassword = await bcrypt2.hash(
      password,
      Number(config_default.bcrypt_salt_rounds)
    );
    const superAdmin = await prisma.user.create({
      data: {
        name,
        email,
        role: Role.SUPER_ADMIN,
        password: hashedPassword,
        needPasswordChange: false,
        emailVerified: true
      }
    });
    console.log("Super Admin Created : ", superAdmin);
  } catch (error) {
    console.log("Error Seeding Super Admin : ", error);
    await prisma.user.delete({
      where: {
        email: config_default.super_admin_email
      }
    });
  }
};

// src/server.ts
var PORT = config_default.port;
async function main() {
  try {
    await prisma.$connect();
    console.log("connected to the database successfully!");
    await redisClient.connect();
    console.log("Redis Connected successfully");
    await transporter.verify();
    console.log("Nodemailer Connected Successfully");
    await seedSuperAdmin();
    app_default.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}
main();
//# sourceMappingURL=server.js.map