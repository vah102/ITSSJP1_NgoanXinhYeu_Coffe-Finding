import feature from "../models/feature.js";

const featureController = {
    getFeaturesByStoreId: async (req, res) => {
        try {
            const { storeId } = req.params;
            const features = await feature.getByStoreId(storeId);
            if (!features.length) {
                return res.status(404).json({ message: "No features found for this store." });
            }
            res.status(200).json(features);
        } catch (error) {
            res.status(500).json({ message: "Error fetching features.", error: error.message });
        }
    },
};

export default featureController;
