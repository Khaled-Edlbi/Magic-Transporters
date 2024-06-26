import express from 'express'
import mongoose from 'mongoose'

import { magicMoverModel, magicItemModel } from '../models/index.js'
import { errorController } from '../controllers/index.js'

const router = express.Router()


router.post('/magicMover/create', async (req, res) => {

  const apiController = async () => {
    const { weightLimit, energy, questState, items } = req.body
      
    // Create a new magicMover document
    const newMover = new magicMoverModel({
      weightLimit,
      energy,
      questState,
      items,
    });
  
    // Save to database
    const savedMover = await newMover.save()
    res.status(201).json(savedMover);
  };

  await errorController({ apiController, res });
});


router.patch('/magicMover/loadItems', async (req, res) => {

  const apiController = async () => {
    const { id, items } = req.body
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid MagicMover ID' });
    }
    
    const magicMover = await magicMoverModel.findById(id)
  
    if (!magicMover) {
      return res.status(404).json({ error: 'Magic mover not found' });
    }
  
    if (magicMover.questState !== 'loading') {
      return res.status(400).json({ error: 'magic mover state not available for loading' });
    }
  
    const magicItems: number[] = [0]
    
    for (const _id of items) {
      const magicItem = await magicItemModel.findById(_id)
      magicItem && magicItems.push(magicItem.weight)
    }
  
    const itemsWeightSum = magicItems.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  
    if (itemsWeightSum > magicMover.weightLimit) {
      return res.status(400).json({ error: "Items weight exceeded magic mover weight limit, try to remove some items" });
    }
  
    magicMover.items = items
    await magicMover.save();
  
    res.status(200).json(magicMover);
  };

  await errorController({ apiController, res });
});


router.patch('/magicMover/unloadItems', async (req, res) => {

  const apiController = async () => {
    const { id } = req.body
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid MagicMover ID' });
    }
    
    const magicMover = await magicMoverModel.findById(id)
  
    if (!magicMover) {
      return res.status(404).json({ error: 'Magic mover not found' });
    }
  
    if (magicMover.questState !== 'done') {
      return res.status(400).json({ error: 'Magic mover state not available for unloading' });
    }
  
    magicMover.items = []
    magicMover.numberOfMissions += 1
    await magicMover.save();
  
    res.status(200).json(magicMover);
  };

  await errorController({ apiController, res });
});


router.patch('/magicMover/updateState', async (req, res) => {

  const apiController = async () => {
    const { id, questState } = req.body
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid MagicMover ID' });
    }
  
    const updatedMover = await magicMoverModel.findByIdAndUpdate(
      id,
      { questState },
      { new: true, runValidators: true } // Return the updated document
    );
  
    if (!updatedMover) {
      return res.status(404).json({ error: 'Magic Mover not found' });
    }
  
    res.status(200).json(updatedMover);
  };

  await errorController({ apiController, res });
});


router.get('/magicMover/getMostMissions', async (_, res) => {

  const apiController = async () => {
    const magicMovers = await magicMoverModel.find().sort({ numberOfMissions: -1 })
    res.status(200).json(magicMovers);
  };

  await errorController({ apiController, res });
});


router.post('/magicItem/create', async (req, res) => {

  const apiController = async () => {
    const { name, weight } = req.body
    
    // Create a new magicItem document
    const newItem = new magicItemModel({
      name,
      weight
    });
  
    // Save to database
    const savedItem = await newItem.save()
    res.status(201).json(savedItem);
  };

  await errorController({ apiController, res });
});


export default router