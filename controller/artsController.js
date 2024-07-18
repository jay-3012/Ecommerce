import Art from '../model/artsmodel.js';

export const getArt = async(req, res)=>{
    try {
        const art = await Art.find();
        res.status(200).json(art);
    } catch (error) {
        console.log("Erroor: ",error);
        res.status(500).json(error);
    }
};