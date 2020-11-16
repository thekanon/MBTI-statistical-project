//환경변수 import
require("dotenv").config();
//GraphQL import
import { GraphQLServer } from "graphql-yoga";
//logger import
import logger from "morgan";

//스키마 import
import schema from "./schema"

//환경변수를 .env에서 읽어오도록 함
const PORT = process.env.PORT || 4000;
//GraphQL의 schema를 정의

//서버 생성 및 실행
const server = new GraphQLServer({ schema });

//로거
server.express.use(logger("dev"));

server.start({port: PORT},() => 
    console.log(`Server running on http://localhost:${PORT}`)
);