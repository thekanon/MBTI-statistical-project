import {prisma} from "../../../../generated/prisma-client"
export default {
    Query:{
        getUser: async(_, args) => {            
            return await prisma.user({ id: args.id });
        }
    }
}