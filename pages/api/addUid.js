// pages/api/addUid.js
import dbConnect from '../../utils/dbConnect';
import UidModel from '../../models/UidModel';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({ message: 'UID is required' });
    }

    try {
        await dbConnect();


        const uidRecord = await UidModel.findOneAndUpdate(
            {}, 
            { $push: { uids: uid } }, 
            { new: true, upsert: true }
        );

        return res.status(200).json({ message: 'UID added successfully', uidRecord });
    } catch (error) {
        console.error('Error adding UID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
