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
        return;
    } 
       res.send({
            status: 200,
            data: corruptioncase,
        });
    }


    static editARedFlagById(req, res){
        const {incident_id} = req.params;
        const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id));

        if(!corruptioncase){
            res.status(404).send({
                status: 404,
                message: 'The record with the given id was not found',
            });
            return;
        }

        // destructure corruptioncase
        /*let {title,
                comment,
                address,
                culprits,
                } = corruptioncase;*/
         const dateObj = new Date();
        corruptioncase.title = req.body.title;
        corruptioncase.comment = req.body.comment;
        corruptioncase.Address = req.body.address;
        corruptioncase.culprits = req.body.culprits;
        corruptioncase.editedon = `${dateObj.getFullYear()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getDate()}`;

        res.send({
            status: 200,
            data: corruptioncase,
        });


    }

    static deleteARedFlagById(req, res){
        const {incident_id} = req.params;
        const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id));
        if(!corruptioncase){
            res.status(404).send({
                status: 404,
                message: 'The record with the given id was not found',
            });
            return;
        }

        const index = corruptioncases.indexOf(corruptioncase);
        const result = corruptioncases.splice(index, 1);
        if(!result){
            res.status(400).send({
                status: 400,
                message: 'An error occured. Try again later',
            });
            return;
        }
        res.send({
            status: 200,
            data: corruptioncase,
        })
    }
    

}



export default redFlagsController;