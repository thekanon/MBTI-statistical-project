import {prisma} from "../../../../generated/prisma-client"
export default {
    Query:{
        allUser: async() => {
            return await prisma.users()
        }
    }
} 