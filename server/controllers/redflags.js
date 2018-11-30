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
            data: redFlag,
        });
    }

    static getARedFlagById(req, res){
        const {incident_id} = req.params;
        const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id));
    if(!corruptioncase){
        res.status(404).send({
            status: 404,
            message: 'The record with the given id was not found',
        });
    } 
       res.send({
            status: 200,
            data: corruptioncase,
        });
    }

    

}



export default redFlagsController;