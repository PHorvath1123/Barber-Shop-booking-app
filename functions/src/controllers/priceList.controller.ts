import {db} from "../firebase.server.config";
import {NextFunction, Request, Response} from "express";

type priceType = {
    title: string,
    price: number
};

type PriceListItem = {
    category: string;
    services: priceType[];
  };


export const getPriceListFromDB = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const categories = ["Beard & Shave", "Extras", "Haircuts", "Special Services"];
    const priceList: PriceListItem[] = [];

    for (const category of categories) {
      const categoryRef = db.collection("pricing").doc("categories").collection(category);
      const categorySnapshot = await categoryRef.get();

      if (categorySnapshot.empty) {
        throw new Error("No services found for category");
      }

      const services: priceType[] = [];

      categorySnapshot.forEach((doc: any) => {
        const data = doc.data();
        const prices: priceType = {
          title: doc.id,
          price: data.price,
        };

        services.push(prices);
      });

      priceList.push({
        category: category,
        services: services,
      });
    }

    res.json(priceList);
  } catch (error) {
    console.error("Error getting services:", error);
    res.status(500).json({message: `Failed to retrieve the price list from the database. ${error}`});
    next(error);
  }
};
