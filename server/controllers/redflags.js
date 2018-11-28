import corruptioncases from '../models/incidents';

class redFlagsController{

    static getAllRedflags(req, res){
        res.send({
            status: 200,
            data: corruptioncases 
        });
    }
    static deleteARedFlag(req, res){
        res.send(corruptioncases);
    }

    static createRedFlag(req, res){
        const dateObj = new Date();
        const redFlag = { 
            id: corruptioncases.length + 1,
            title: req.body.title,
            type: 'red-flag',
            address: req.body.address,
            comment: req.body.comment,
            culprits: req.body.culprits,
            status: 'draft',
            createdby: 1,
            createdon: `${dateObj.getFullYear()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getDate()}`,
        }
        
        corruptioncases.push(redFlag);
        res.send({
            status: 200,
            data: redFlag 
        });
    }

    

}



export default redFlagsController;