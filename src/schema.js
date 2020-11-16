import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
//기존에는 merge-graphql-schemas를 사용하였으나, 확인해보니 최신 버전에서는 graphql-tools에 통합됨. 따라서 최신 문서를 참고하여 변형함.
import { loadFilesSync  } from "@graphql-tools/load-files";

//type 정의
const allTypes = loadFilesSync (path.join(__dirname, "/api/**/*.graphql"));
//resolve 정의
const allResolvers = loadFilesSync (path.join(__dirname, "/api/**/*.js"))

//schema 생성
const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(allTypes),
    resolvers: mergeResolvers(allResolvers)
})

export default schema; 

// api 하위의 모든 파일들을 graphql, js로 나누어 한번에 받아옴. 받아온 정보로 스키마 생성함.